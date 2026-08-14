-- ROLES
CREATE TYPE public.app_role AS ENUM ('owner','editor');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id);
$$;

CREATE POLICY "read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'owner'));
CREATE POLICY "owners manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'owner')) WITH CHECK (public.has_role(auth.uid(),'owner'));

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email,'@',1)))
  ON CONFLICT (id) DO NOTHING;
  -- first ever user becomes owner
  IF NOT EXISTS (SELECT 1 FROM public.user_roles) THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'owner');
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- CATEGORIES
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  sort_order int NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read categories" ON public.categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "staff manage categories" ON public.categories FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER categories_updated BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ARTICLES
CREATE TABLE public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  dek text,
  body text NOT NULL DEFAULT '',
  image_url text,
  image_caption text,
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  author_name text NOT NULL DEFAULT 'DNL Desk',
  tags text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  read_minutes int NOT NULL DEFAULT 3,
  is_lead boolean NOT NULL DEFAULT false,
  is_featured boolean NOT NULL DEFAULT false,
  is_video boolean NOT NULL DEFAULT false,
  video_url text,
  pull_quote text,
  views int NOT NULL DEFAULT 0,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX articles_status_pub_idx ON public.articles (status, published_at DESC);
CREATE INDEX articles_category_idx ON public.articles (category_id);
GRANT SELECT ON public.articles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.articles TO authenticated;
GRANT ALL ON public.articles TO service_role;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published articles" ON public.articles FOR SELECT TO anon, authenticated
  USING (status = 'published' AND published_at IS NOT NULL AND published_at <= now());
CREATE POLICY "staff read all articles" ON public.articles FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "staff manage articles" ON public.articles FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER articles_updated BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- TICKER
CREATE TABLE public.ticker_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  href text,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.ticker_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ticker_items TO authenticated;
GRANT ALL ON public.ticker_items TO service_role;
ALTER TABLE public.ticker_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read ticker" ON public.ticker_items FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "staff manage ticker" ON public.ticker_items FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- SITE SETTINGS (single row)
CREATE TABLE public.site_settings (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  accent text NOT NULL DEFAULT 'crimson',
  default_theme text NOT NULL DEFAULT 'light',
  logo_url text,
  hero_takeover_url text,
  hero_takeover_title text,
  hero_takeover_dek text,
  hero_takeover_enabled boolean NOT NULL DEFAULT false,
  module_order text[] NOT NULL DEFAULT ARRAY['hero','categories','top','delhi','trending','video','opinion','sections','newsletter'],
  hidden_modules text[] NOT NULL DEFAULT '{}',
  aqi int NOT NULL DEFAULT 168,
  aqi_label text NOT NULL DEFAULT 'Moderate',
  temperature_c int NOT NULL DEFAULT 31,
  weather_label text NOT NULL DEFAULT 'Haze',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "owners update settings" ON public.site_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'owner')) WITH CHECK (public.has_role(auth.uid(),'owner'));
CREATE TRIGGER settings_updated BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.site_settings (id) VALUES (1);

INSERT INTO public.categories (slug, name, description, sort_order) VALUES
 ('delhi-ncr','Delhi-NCR','Hyperlocal reporting from Delhi, Gurugram, Noida, Ghaziabad and Faridabad.',1),
 ('india','India','National politics, policy and the stories shaping the republic.',2),
 ('world','World','Global affairs, diplomacy and dispatches from abroad.',3),
 ('business','Business','Markets, startups, policy and the economy.',4),
 ('sports','Sports','Cricket, football, athletics and everything in between.',5),
 ('entertainment','Entertainment','Film, streaming, music and culture.',6),
 ('tech','Tech','AI, devices, telecom and the digital economy.',7),
 ('opinion','Opinion','Analysis, editorials and columns from our contributors.',8);

INSERT INTO public.articles (slug,title,dek,body,image_url,image_caption,category_id,author_name,tags,status,published_at,read_minutes,is_lead,is_featured,is_video,pull_quote,views) VALUES
('delhi-metro-phase-4-corridor-opens','Delhi Metro Phase 4 opens first corridor, cutting the Janakpuri–Airport run to 28 minutes','The 12.3-km stretch is the first of three Phase 4 lines to be commissioned, with daily ridership projected to cross 4 lakh by December.',
 E'The first corridor of Delhi Metro Phase 4 opened to commuters on Monday morning, ending a wait that stretched across two extensions and a pandemic.\n\nOfficials said the line will carry an estimated 1.6 lakh passengers a day in its first quarter, rising sharply once the interchange at Krishna Park Extension is completed.\n\n"This is the single largest addition to the network since 2018," a senior DMRC official said, adding that headways will be tightened to three minutes during peak hours by the end of the year.\n\nResidents along the corridor have already begun to see the second-order effects. Property listings in Keshopur and Peeragarhi have moved up, and feeder bus routes are being redrawn to meet the new stations.',
 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1600&q=80','A train pulls into the newly opened Phase 4 corridor.',(SELECT id FROM public.categories WHERE slug='delhi-ncr'),'Ananya Sharma',ARRAY['metro','infrastructure','dmrc'],'published',now() - interval '2 hours',5,true,true,false,'This is the single largest addition to the network since 2018.',18432),
('parliament-clears-data-protection-amendments','Parliament clears data protection amendments after a marathon eight-hour debate','The bill tightens breach-notification timelines to 48 hours and creates an appellate tribunal for consent disputes.',
 E'The amendments passed in the Lok Sabha late on Sunday after an eight-hour debate that ran past midnight.\n\nThe most consequential change shortens the window for reporting a data breach from 72 hours to 48, bringing India closer to European practice.\n\nIndustry bodies welcomed the appellate tribunal but warned that compliance costs for smaller firms could rise steeply in the first year.',
 'https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?w=1600&q=80','Parliament House during the monsoon session.',(SELECT id FROM public.categories WHERE slug='india'),'Rohit Menon',ARRAY['policy','privacy'],'published',now() - interval '5 hours',6,false,true,false,null,9210),
('yamuna-water-level-flood-watch','Yamuna crosses warning mark; low-lying colonies moved to flood watch','Relief camps have been readied in East Delhi as the river holds above 204.5 metres for a third day.',
 E'The Yamuna held above the warning mark for a third consecutive day, prompting the district administration to move 14 low-lying colonies onto a flood watch.\n\nRelief camps at Mayur Vihar and Yamuna Bazar have been stocked, officials said, though no evacuation order has been issued yet.\n\nUpstream releases from Hathnikund remain the deciding factor over the next 48 hours.',
 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=1600&q=80','The Yamuna near the old iron bridge.',(SELECT id FROM public.categories WHERE slug='delhi-ncr'),'Kavita Rao',ARRAY['yamuna','monsoon'],'published',now() - interval '7 hours',4,false,false,false,null,7620),
('gurugram-cyber-hub-metro-link','Gurugram approves elevated link between Cyber Hub and the Rapid Metro spur','The 4.1-km connector is expected to take 22,000 vehicles off Golf Course Road each day.',
 E'The Gurugram Metropolitan Development Authority cleared the detailed project report on Friday.\n\nWork is expected to begin in the next fiscal, with a 36-month construction window.',
 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&q=80','Traffic on Golf Course Road at dusk.',(SELECT id FROM public.categories WHERE slug='delhi-ncr'),'Imran Qureshi',ARRAY['gurugram','transport'],'published',now() - interval '11 hours',3,false,false,false,null,4310),
('rupee-steadies-as-rbi-holds','Rupee steadies as RBI holds rates and signals a longer pause','The central bank kept the repo rate unchanged at 6.25% and revised its inflation forecast down by 20 basis points.',
 E'The Monetary Policy Committee voted five to one to hold, with the lone dissent favouring a 25-basis-point cut.\n\nBond yields eased four basis points after the announcement, while the rupee recovered to 83.42 against the dollar.',
 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80','The RBI headquarters in Mumbai.',(SELECT id FROM public.categories WHERE slug='business'),'Sneha Iyer',ARRAY['rbi','markets'],'published',now() - interval '9 hours',4,false,true,false,null,6120),
('india-chase-down-target-in-chennai','India chase down 297 in Chennai as Gill anchors the innings','The captain''s unbeaten 118 sealed the series with a game to spare.',
 E'Shubman Gill''s unbeaten century turned a nervy chase into a comfortable one in Chennai.\n\nThe partnership of 132 for the fourth wicket effectively decided the contest.',
 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1600&q=80','A packed Chepauk on match day.',(SELECT id FROM public.categories WHERE slug='sports'),'Vikram Nair',ARRAY['cricket'],'published',now() - interval '13 hours',3,false,false,false,null,15220),
('global-shipping-rates-red-sea','Shipping rates ease as Red Sea traffic returns to two-thirds of pre-crisis volume','Carriers say the recovery is fragile and insurance premiums remain elevated.',
 E'Container rates on the Asia–Europe route fell 9% week on week.\n\nInsurers, however, have kept war-risk premiums broadly unchanged, citing continued uncertainty.',
 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1600&q=80','Containers stacked at a transshipment terminal.',(SELECT id FROM public.categories WHERE slug='world'),'Meera Krishnan',ARRAY['trade','shipping'],'published',now() - interval '15 hours',5,false,false,false,null,3980),
('ai-chip-plant-approved-in-noida','Cabinet clears semiconductor packaging plant in Noida with ₹18,000 crore outlay','The facility is expected to employ 4,500 people directly by its third year of operation.',
 E'The plant will focus on advanced packaging rather than fabrication, a segment where India has a realistic near-term opening.\n\nGround-breaking is scheduled for the first quarter of next year.',
 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80','A semiconductor wafer under inspection.',(SELECT id FROM public.categories WHERE slug='tech'),'Arjun Desai',ARRAY['semiconductors','noida'],'published',now() - interval '18 hours',4,false,true,false,null,8890),
('opinion-city-that-forgot-its-lungs','The city that forgot its lungs','Delhi''s air crisis is not a season. It is a design decision we renew every year.',
 E'Every November we behave as though the smog arrived unannounced.\n\nIt did not. It was scheduled — by the ring roads we widened, the buses we did not buy, and the enforcement we quietly deferred.\n\nThe fix is unglamorous and entirely known: transit that people actually prefer, construction dust rules with teeth, and a regional airshed authority that can act across state lines.',
 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=80','Smog over central Delhi.',(SELECT id FROM public.categories WHERE slug='opinion'),'Nikhil Bhattacharya',ARRAY['air quality','editorial'],'published',now() - interval '20 hours',7,false,false,false,'It was scheduled — by the ring roads we widened and the buses we did not buy.',5140),
('streaming-platform-orders-delhi-series','Streaming giant orders an eight-part series set in Old Delhi','Shooting begins in Chandni Chowk this winter with a largely local crew.',
 E'The series is described as a slow-burn family drama spanning three generations of a Chandni Chowk trading house.\n\nCasting is expected to be announced next month.',
 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=80','A lane in Chandni Chowk at night.',(SELECT id FROM public.categories WHERE slug='entertainment'),'Priya Sethi',ARRAY['streaming','film'],'published',now() - interval '22 hours',3,false,false,false,null,4470),
('mcd-property-tax-amnesty','MCD extends property tax amnesty window to March','Officials say collections have already crossed last year''s full-year total.',
 E'The civic body reported collections of ₹2,140 crore so far this fiscal.\n\nThe amnesty waives penalty and interest on arrears for those clearing principal dues.',
 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80','The MCD civic centre.',(SELECT id FROM public.categories WHERE slug='delhi-ncr'),'Kavita Rao',ARRAY['mcd','tax'],'published',now() - interval '26 hours',3,false,false,false,null,2980),
('video-inside-the-new-airport-terminal','Watch: Inside the redesigned Terminal 1 at IGI Airport','A four-minute walkthrough of the new check-in hall and baggage system.',
 E'Our reporter walks the length of the new departures hall ahead of Monday''s handover.',
 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80','The new departures hall at Terminal 1.',(SELECT id FROM public.categories WHERE slug='delhi-ncr'),'DNL Video Desk',ARRAY['airport','video'],'published',now() - interval '28 hours',4,false,false,true,null,11200),
('video-monsoon-drone-tour','Watch: A drone tour of a monsoon morning over Lutyens'' Delhi','Six minutes of rain-washed avenues, from Rajpath to Lodhi Road.',
 E'Shot over three mornings in August.',
 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1600&q=80','Rain over central Delhi.',(SELECT id FROM public.categories WHERE slug='delhi-ncr'),'DNL Video Desk',ARRAY['video','monsoon'],'published',now() - interval '30 hours',6,false,false,true,null,7340),
('startup-funding-rebound-q3','Indian startup funding rebounds 34% in the third quarter','Late-stage rounds returned, though seed activity remains subdued.',
 E'Total disclosed funding reached $3.9 billion across 214 deals.\n\nFintech and enterprise software accounted for more than half the capital deployed.',
 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80','A trading screen showing quarterly figures.',(SELECT id FROM public.categories WHERE slug='business'),'Sneha Iyer',ARRAY['startups','funding'],'published',now() - interval '34 hours',4,false,false,false,null,3320),
('un-climate-finance-deal','UN talks land a climate finance deal after two extra days','Developing economies secured a floor of $300 billion a year, short of what they had sought.',
 E'The final text was gavelled through at 4am local time.\n\nNegotiators from small island states described the outcome as "survivable, not sufficient".',
 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80','Delegates at the closing plenary.',(SELECT id FROM public.categories WHERE slug='world'),'Meera Krishnan',ARRAY['climate','un'],'published',now() - interval '38 hours',6,false,false,false,null,2760),
('delhi-school-air-purifier-pilot','Delhi begins air purifier pilot across 120 government school classrooms','Early readings show indoor PM2.5 down by 46% during school hours.',
 E'The pilot covers 120 classrooms across 24 schools in the worst-affected districts.\n\nIf results hold through winter, the programme will expand to 1,000 classrooms.',
 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80','A classroom in a Delhi government school.',(SELECT id FROM public.categories WHERE slug='delhi-ncr'),'Ananya Sharma',ARRAY['education','air quality'],'published',now() - interval '42 hours',3,false,false,false,null,4120),
('tech-open-source-model-release','Indian research lab releases an open-weight multilingual model','The 12-billion-parameter model covers 22 scheduled languages and ships with a permissive licence.',
 E'The release includes evaluation code and a 400-page technical report.\n\nEarly benchmarks place it ahead of comparable open models on Indic reasoning tasks.',
 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&q=80','A server rack in a research data centre.',(SELECT id FROM public.categories WHERE slug='tech'),'Arjun Desai',ARRAY['ai','open source'],'published',now() - interval '46 hours',5,false,false,false,null,6640),
('sports-delhi-marathon-route','Delhi Half Marathon announces a new route through Lutyens'' Delhi','Organisers expect 38,000 runners across four categories.',
 E'The revised route avoids the Ring Road entirely, cutting the number of diversions in half.',
 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1600&q=80','Runners at the start line.',(SELECT id FROM public.categories WHERE slug='sports'),'Vikram Nair',ARRAY['running'],'published',now() - interval '50 hours',3,false,false,false,null,2210),
('entertainment-nsd-festival','National School of Drama festival returns with 42 productions','The three-week programme includes eleven premieres and a free open-air strand.',
 E'Tickets for the open-air strand will be distributed by ballot.',
 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=1600&q=80','A theatre stage before curtain.',(SELECT id FROM public.categories WHERE slug='entertainment'),'Priya Sethi',ARRAY['theatre'],'published',now() - interval '54 hours',3,false,false,false,null,1880),
('opinion-case-for-a-metropolitan-authority','The case for one authority that can actually run the NCR','Three states, one city, and a coordination problem we keep pretending is a planning problem.',
 E'The National Capital Region is governed as though its residents respect state boundaries on their commute. They do not.\n\nA single metropolitan authority with revenue powers is the only structure that matches how the region actually functions.',
 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80','An aerial view of the NCR skyline.',(SELECT id FROM public.categories WHERE slug='opinion'),'Nikhil Bhattacharya',ARRAY['governance','ncr'],'published',now() - interval '58 hours',6,false,false,false,'Three states, one city, and a coordination problem we keep pretending is a planning problem.',3010);

INSERT INTO public.ticker_items (text, href, sort_order) VALUES
 ('Delhi Metro Phase 4 corridor opens to commuters', '/article/delhi-metro-phase-4-corridor-opens', 1),
 ('Yamuna holds above warning mark for a third day', '/article/yamuna-water-level-flood-watch', 2),
 ('RBI holds repo rate at 6.25%, trims inflation forecast', '/article/rupee-steadies-as-rbi-holds', 3),
 ('Cabinet clears ₹18,000 crore semiconductor plant in Noida', '/article/ai-chip-plant-approved-in-noida', 4),
 ('India seal series in Chennai with Gill unbeaten on 118', '/article/india-chase-down-target-in-chennai', 5);