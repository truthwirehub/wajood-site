import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

const translations = {
  en: { title: "Beyond the Illusion", tagline: "The surface is for everyone. The depths are for the seekers.", btn: "Enter the Depth", vidTitle: "LATEST TRANSMISSIONS", rtl: false },
  ur: { title: "وہم سے پرے", tagline: "سطح سب کے لیے ہے، گہرائیاں صرف متلاشیوں کے لیے۔", btn: "گہرائی میں اتریں", vidTitle: "تازہ ترین نشریات", rtl: true },
  ar: { title: "ما وراء الوهم", tagline: "السطح للجميع. الأعماق للباحثين عن الحقيقة.", btn: "ادخل إلى الأعماق", vidTitle: "أحدث البث", rtl: true },
  hi: { title: "भ्रम से परे", tagline: "सतह सबके लिए है। गहराइयाँ तलाशने वालों के लिए हैं।", btn: "गहराई में प्रवेश करें", vidTitle: "नवीनतम प्रसारण", rtl: false },
  es: { title: "Más allá de la Ilusión", tagline: "La superficie es para todos. Las profundidades para los buscadores.", btn: "Entra en lo Profundo", vidTitle: "Últimas Transmisiones", rtl: false },
  zh: { title: "超越幻象", tagline: "表面属于每个人。深处属于寻求者。", btn: "进入深度", vidTitle: "最新传输", rtl: false },
  fr: { title: "Au-delà de l'Illusion", tagline: "La surface est pour tout le monde. Les profondeurs sont pour les chercheurs.", btn: "Entrer dans la Profondeur", vidTitle: "Dernières Transmissions", rtl: false },
  ru: { title: "Вне иллюзии", tagline: "Поверхность для всех. Глубины for искателей.", btn: "Войти в глубину", vidTitle: "Последние передачи", rtl: false },
  pt: { title: "Além da Ilusão", tagline: "A superfície é para todos. As profundidades são para os buscadores.", btn: "Entrar na Profundeza", vidTitle: "Últimas Transmissões", rtl: false },
  bn: { title: "মায়ার ওপারে", tagline: "পৃষ্ঠতল সবার জন্য। গভীরতা সন্ধানীদের জন্য।", btn: "গভীরতায় প্রবেশ করুন", vidTitle: "সর্বশেষ সম্প্রচার", rtl: false },
  id: { title: "Melampaui Ilusi", tagline: "Permukaan untuk semua orang. Kedalaman untuk para pencari.", btn: "Masuk ke Kedalaman", vidTitle: "Transmisi Terbaru", rtl: false },
  ja: { title: "幻想の先へ", tagline: "表面は誰のためでもあります。深淵は探求者のためにあります。", btn: "深淵へ", vidTitle: "最新の送信", rtl: false },
  ko: { title: "환상 너머", tagline: "표면은 모두를 위한 것입니다. 깊이는 탐求자를 위한 것입니다.", btn: "심연으로 들어가기", vidTitle: "최신 전송", rtl: false },
  tr: { title: "İllüzyonun Ötesinde", tagline: "Yüzey herkes içindir. Derinlikler arayanlar içindir.", btn: "Derinliğe Gir", vidTitle: "Son Yayınlar", rtl: false },
  vi: { title: "Vượt xa ảo ảnh", tagline: "Bề mặt dành cho tất cả mọi người. Chiều sâu dành cho những người tìm kiếm.", btn: "Đi vào chiều sâu", vidTitle: "Chương trình mới nhất", rtl: false },
  de: { title: "Jenseits der Illusion", tagline: "Die Oberfläche ist für jeden. Die Tiefen sind für die Suchenden.", btn: "In die Tiefe gehen", vidTitle: "Neueste Übertragungen", rtl: false },
  it: { title: "Oltre l'Illusion", tagline: "La superficie è per tutti. Le profondità sono per i cercatori.", btn: "Entra nel Profondo", vidTitle: "Ultime Trasmissioni", rtl: false },
  fa: { title: "فراتر از توهم", tagline: "سطح برای همه است. اعماق برای جویندگان است.", btn: "ورود به عمق", vidTitle: "آخرین انتقال ها", rtl: true },
  pl: { title: "Poza Iluzją", tagline: "Powierzchnia jest dla wszystkich. Głębia jest dla poszukiwaczy.", btn: "Wejdź w Głąb", vidTitle: "Najnowsze Transmisje", rtl: false },
  nl: { title: "Voorbij de Illusie", tagline: "De oppervlakte is voor iedereen. De diepten zijn voor de zoekers.", btn: "Ga de diepte in", vidTitle: "Laatste Uitzendingen", rtl: false },
  sv: { title: "Bortom Illusionen", tagline: "Ytan är för alla. Djupen är för sökarna.", btn: "Gå in i djupet", vidTitle: "Senaste Sändningar", rtl: false },
  th: { title: "เหนือมายา", tagline: "พื้นผิวมีไว้สำหรับทุกคน ความลึกมีไว้สำหรับผู้แสวงหา", btn: "เข้าสู่ความลึก", vidTitle: "การส่งสัญญาณล่าสุด", rtl: false },
  ms: { title: "Melampaui Ilusi", tagline: "Permukaan adalah untuk semua orang. Kedalaman adalah untuk pencari.", btn: "Masuk ke Kedalaman", vidTitle: "Transmisi Terkini", rtl: false },
  sw: { title: "Zaidi ya ảo ảnh", tagline: "Uso ni kwa kila mtu. Vilindi ni kwa watafuta.", btn: "Ingia Ndani", vidTitle: "Matangazo ya Hivi Punde", rtl: false },
  ta: { title: "மாயைக்கு அப்பால்", tagline: "மேற்பரப்பு அனைவருக்கும். ஆழம் தேடுபவர்களுக்கானது.", btn: "ஆழத்திற்குள் நுழையுங்கள்", vidTitle: "சமீபத்திய ஒளிபரப்புகள்", rtl: false },
  si: { title: "මායාවෙන් ඔබ්බට", tagline: "මතුපිට සැමට ය. ගැඹුර සොයන්නන් සඳහා ය.", btn: "ගැඹුරට පිවිසෙන්න", vidTitle: "නවතම විකාශන", rtl: false },
  he: { title: "מעבר לאשליה", tagline: "השטח מיועד לכולם. המעמקים מיועדים למחפשים.", btn: "היכנס לעומק", vidTitle: "שידורים אחרונים", rtl: true },
  tl: { title: "Higit pa sa Ilusyon", tagline: "Ang ibabaw ay para sa lahat. Ang kailaliman ay para sa mga naghahanap.", btn: "Pumasok sa Kailaliman", vidTitle: "Mga Pinakabagong Transmisyon", rtl: false },
  el: { title: "Πέρα από την ψευδαίσθηση", tagline: "Η επιφάνεια είναι για όλους. Τα βάθη είναι για τους αναζητητές.", btn: "Μπες στο Βάθος", vidTitle: "Τελευταίες Μεταδόσεις", rtl: false }
};

const languages = [
  { code: 'en', name: 'ENGLISH' }, { code: 'ur', name: 'اردو' }, { code: 'ar', name: 'العربية' },
  { code: 'hi', name: 'हिन्दी' }, { code: 'es', name: 'ESPAÑOL' }, { code: 'zh', name: '中文' },
  { code: 'fr', name: 'FRANÇAIS' }, { code: 'ru', name: 'РУССКИЙ' }, { code: 'pt', name: 'PORTUGUÊS' },
  { code: 'bn', name: 'বাংলা' }, { code: 'id', name: 'BAHASA INDONESIA' }, { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' }, { code: 'tr', name: 'TÜRKÇE' }, { code: 'vi', name: 'TIẾNG VIỆT' },
  { code: 'de', name: 'DEUTSCH' }, { code: 'it', name: 'ITALIANO' }, { code: 'fa', name: 'فارسی' },
  { code: 'pl', name: 'POLSKI' }, { code: 'nl', name: 'NEDERLANDS' }, { code: 'sv', name: 'SVENSKA' },
  { code: 'th', name: 'ไทย' }, { code: 'ms', name: 'BAHASA MELAYU' }, { code: 'sw', name: 'KISWAHILI' },
  { code: 'ta', name: 'தமிழ்' }, { code: 'si', name: 'සිංහල' }, { code: 'he', name: 'עברית' },
  { code: 'tl', name: 'FILIPINO' }, { code: 'el', name: 'ΕΛΛΗΝΙΚΑ' }
];

export default function Wajood() {
  const [lang, setLang] = useState('en');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  
  const t = translations[lang] || translations['en'];

  // AUTOMATIC BACKGROUND VIDEO SCROLL TRIGGER
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      const scrollAnimation = gsap.fromTo(video, 
        { currentTime: 0 },
        {
          currentTime: video.duration || 5,
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1, // Video frames smooth changes along with scroll
          }
        }
      );

      return () => {
        if(scrollAnimation.scrollTrigger) scrollAnimation.scrollTrigger.kill();
      };
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
  }, []);

  // AUTOMATIC YOUTUBE FETCHER
  useEffect(() => {
    const CHANNEL_ID = "UChK2SN8qHrCUusP5V1a3onA"; 
    const rssUrl = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`);
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        if (data.items && data.items.length > 0) {
          const latestVids = data.items.slice(0, 3).map(item => {
            return item.link.split('v=')[1].split('&')[0];
          });
          setVideos(latestVids);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div dir={t.rtl ? 'rtl' : 'ltr'} style={{ minHeight: '400vh', position: 'relative', color: 'white', backgroundColor: '#020205' }}>
      
      {/* AUTOMATIC STREAMING VIDEO */}
      <video 
        ref={videoRef}
        src="https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-futuristic-glowing-space-tunnel-43180-large.mp4"
        preload="auto"
        muted
        playsInline
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', objectFit: 'cover', zIndex: 0, pointerEvents: 'none' }}
      />
      
      <div className="bg-glow" style={{ zIndex: 1, position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'radial-gradient(circle, rgba(98,0,234,0.05) 0%, rgba(0,0,0,0.7) 100%)', pointerEvents: 'none' }} />
      
      {/* NAVIGATION BAR */}
      <nav style={{ position: 'fixed', width: '100%', top: 0, zIndex: 50, background: 'rgba(2,2,5,0.7)', backdropFilter: 'blur(10px)', padding: '20px 0' }}>
        <div style={{maxWidth:'1200px', margin:'0 auto', padding:'0 40px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{fontSize: '1.4rem', fontWeight: '800', letterSpacing: '6px'}}>WAJOOD<span style={{color:'#06b6d4'}}>.</span></div>
          
          <div style={{display:'flex', alignItems:'center', gap:'15px', background:'rgba(255,255,255,0.03)', padding:'8px 15px', borderRadius:'20px'}}>
             <Globe2 size={14} color="#06b6d4" />
             <select 
               value={lang} 
               onChange={(e) => setLang(e.target.value)} 
               style={{background:'transparent', color:'#ccc', border:'none', fontSize:'11px', outline:'none', cursor:'pointer'}}
             >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} style={{background:'#111', color:'#fff'}}>
                    {l.name}
                  </option>
                ))}
             </select>
          </div>
        </div>
      </nav>

      {/* MAIN TEXT OVERLAY */}
      <header style={{height:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center', padding:'0 20px', position: 'relative', zIndex: 10}}>
        <AnimatePresence mode='wait'>
          <motion.div
            key={lang}
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{ fontSize: '4.5rem', letterSpacing: '4px', textShadow: '0 0 20px rgba(0,0,0,0.9)' }}>{t.title}</h1>
            <p className="tagline" style={{ textShadow: '0 0 10px rgba(0,0,0,0.9)', color: '#ccc', marginTop: '10px' }}>{t.tagline}</p>
          </motion.div>
        </AnimatePresence>
        
        <motion.a 
          whileHover={{ scale: 1.05 }}
          href="https://www.youtube.com/@WajoodExistenceDecoded" 
          target="_blank" 
          rel="noreferrer"
          className="btn-wajood"
          style={{ marginTop: '40px', display: 'flex', gap: '10px', alignItems: 'center', background: '#06b6d4', color: 'black', padding: '12px 25px', borderRadius: '30px', fontWeight: 'bold', textDecoration: 'none' }}
        >
           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
           {t.btn}
        </motion.a>
      </header>

      {/* AUTOMATIC YOUTUBE TRANSMISSIONS */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 40px', position: 'relative', zIndex: 10, background: 'rgba(2,2,5,0.6)', backdropFilter: 'blur(10px)', borderRadius: '20px', marginBottom: '10vh' }}>
        <h2 style={{ color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '5px', fontSize: '14px', textAlign: 'center', marginBottom: '50px' }}>
          {t.vidTitle}
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {loading ? (
             <p style={{ textAlign: 'center', width: '100%', color: '#71717a', letterSpacing: '3px', fontSize: '12px' }}>DECRYPTING TRANSMISSIONS...</p>
          ) : videos.length > 0 ? (
             videos.map((vid, index) => (
                <div key={index} style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                  <iframe width="100%" height="250" src={`https://www.youtube.com/embed/${vid}`} title={`Wajood Video ${index + 1}`} frameBorder="0" allowFullScreen></iframe>
                </div>
             ))
          ) : (
             <p style={{ textAlign: 'center', width: '100%', color: '#71717a', letterSpacing: '3px', fontSize: '12px' }}>Awaiting New Transmissions...</p>
          )}
        </div>
      </section>

      <footer style={{padding: '80px 0', textAlign: 'center', opacity: 0.5, position: 'relative', zIndex: 10}}>
         <p style={{letterSpacing:'8px', fontSize:'10px', fontWeight:'bold'}}>© 2026 WAJOOD | ALL RIGHTS RESERVED</p>
      </footer>
    </div>
  );
}