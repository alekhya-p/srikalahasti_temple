import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar, 
  Heart, 
  Star,
  ChevronRight,
  ChevronDown,
  Globe,
  Camera,
  Video,
  Download,
  Bell
} from 'lucide-react';

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'hi', name: 'हिंदी' }
];

const content = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Temple',
      darshan: 'Darshan',
      services: 'Online Services',
      gallery: 'Gallery',
      news: 'News & Events',
      contact: 'Contact',
      resources: 'Devotee Resources'
    },
    hero: {
      title: 'Sri Kalahasti Temple',
      subtitle: 'Sacred Abode of Lord Vayu Linga',
      description: 'Experience divine blessings at one of the Pancha Bhoota Sthalams, representing the element of Air (Vayu)',
      cta: 'Book Darshan'
    },
    about: {
      title: 'About Sri Kalahasti Temple',
      history: 'Temple History',
      historyText: 'Sri Kalahasti Temple, located in Chittoor district of Andhra Pradesh, is one of the most significant Shaiva temples in South India. This ancient temple represents the element of Air (Vayu) among the Pancha Bhoota Sthalams.',
      significance: 'Religious Significance',
      significanceText: 'The temple is famous for its Vayu Linga, where Lord Shiva is worshipped as the embodiment of wind. The temple is renowned for Rahu-Ketu poojas and is believed to nullify the malefic effects of these planets.',
      deity: 'Main Deities',
      deityText: 'Lord Shiva (Sri Kalahasteeswara) and Goddess Parvati (Sri Gnana Prasunambika Devi) are the presiding deities of this sacred temple.'
    }
  },
  te: {
    nav: {
      home: 'హోమ్',
      about: 'ఆలయం గురించి',
      darshan: 'దర్శనం',
      services: 'ఆన్‌లైన్ సేవలు',
      gallery: 'గ్యాలరీ',
      news: 'వార్తలు & కార్యక్రమాలు',
      contact: 'సంప్రదించండి',
      resources: 'భక్తుల వనరులు'
    },
    hero: {
      title: 'శ్రీకాళహస్తీశ్వర ఆలయం',
      subtitle: 'వాయు లింగ పవిత్ర నివాసం',
      description: 'వాయు తత్వాన్ని సూచించే పంచభూత స్థలాలలో ఒకటైన ఈ పవిత్ర క్షేత్రంలో దైవాశీర్వాదాలు పొందండి',
      cta: 'దర్శనం బుక్ చేయండి'
    },
    about: {
      title: 'శ్రీకాళహస్తీశ్వర ఆలయం గురించి',
      history: 'ఆలయ చరిత్ర',
      historyText: 'ఆంధ్రప్రదేశ్‌లోని చిత్తూరు జిల్లాలో ఉన్న శ్రీకాళహస్తీశ్వర ఆలయం దక్షిణ భారతదేశంలోని అత్యంత ముఖ్యమైన శైవ ఆలయాలలో ఒకటి.',
      significance: 'మతపరమైన ప్రాముఖ్యత',
      significanceText: 'ఈ ఆలయం వాయు లింగానికి ప్రసిద్ధి చెందింది, ఇక్కడ శివుడిని గాలి మూర్తిగా పూజిస్తారు. రాహు-కేతు పూజలకు ప్రసిద్ధి చెందిన ఈ ఆలయం.',
      deity: 'ముఖ్య దేవతలు',
      deityText: 'శ్రీ కాళహస్తీశ్వరుడు (శివుడు) మరియు శ్రీ జ్ఞానప్రసూనాంబిక దేవి (పార్వతి) ఈ పవిత్ర ఆలయం యొక్క ప్రధాన దేవతలు.'
    }
  },
  hi: {
    nav: {
      home: 'होम',
      about: 'मंदिर के बारे में',
      darshan: 'दर्शन',
      services: 'ऑनलाइन सेवाएं',
      gallery: 'गैलरी',
      news: 'समाचार और घटनाएं',
      contact: 'संपर्क',
      resources: 'भक्त संसाधन'
    },
    hero: {
      title: 'श्री कालहस्ति मंदिर',
      subtitle: 'वायु लिंग का पवित्र धाम',
      description: 'पंच भूत स्थलों में से एक इस पवित्र क्षेत्र में दिव्य आशीर्वाद प्राप्त करें, जो वायु तत्व का प्रतिनिधित्व करता है',
      cta: 'दर्शन बुक करें'
    },
    about: {
      title: 'श्री कालहस्ति मंदिर के बारे में',
      history: 'मंदिर का इतिहास',
      historyText: 'आंध्र प्रदेश के चित्तूर जिले में स्थित श्री कालहस्ति मंदिर दक्षिण भारत के सबसे महत्वपूर्ण शैव मंदिरों में से एक है।',
      significance: 'धार्मिक महत्व',
      significanceText: 'यह मंदिर अपने वायु लिंग के लिए प्रसिद्ध है, जहां भगवान शिव की पूजा हवा के अवतार के रूप में की जाती है। राहु-केतु पूजा के लिए प्रसिद्ध।',
      deity: 'मुख्य देवता',
      deityText: 'भगवान शिव (श्री कालहस्तीश्वर) और देवी पार्वती (श्री ज्ञान प्रसुनांबिका देवी) इस पवित्र मंदिर के मुख्य देवता हैं।'
    }
  }
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const t = content[currentLanguage as keyof typeof content];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'darshan', 'services', 'gallery', 'news', 'contact', 'resources'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        console.log(element?.offsetTop);
        
        if (element) {
          const { offsetTop, offsetHeight } = element;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-orange-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-orange-800">Sri Kalahasti</h1>
                <p className="text-xs text-orange-600">Divine Temple</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {Object.entries(t.nav).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === key
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-700 hover:text-orange-600'
                  }`}
                >
                  {value}
                </button>
              ))}
            </nav>

            {/* Language Selector & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {languages.find(lang => lang.code === currentLanguage)?.name}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[120px] z-50">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          setCurrentLanguage(language.code);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-orange-50 transition-colors ${
                          currentLanguage === language.code ? 'bg-orange-50 text-orange-700' : 'text-gray-700'
                        }`}
                      >
                        {language.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-orange-200">
              <nav className="flex flex-col space-y-3">
                {Object.entries(t.nav).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className={`text-left px-4 py-2 rounded-lg transition-colors ${
                      activeSection === key
                        ? 'bg-orange-100 text-orange-700'
                        : 'text-gray-700 hover:bg-orange-50'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-orange-500 via-yellow-500 to-blue-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M30%2030l15-15v30H30z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center py-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-yellow-100 animate-fade-in-delay-1">
              {t.hero.subtitle}
            </p>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto animate-fade-in-delay-2">
              {t.hero.description}
            </p>
            <button 
              onClick={() => scrollToSection('services')}
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-50 transition-all transform hover:scale-105 shadow-lg animate-fade-in-delay-3"
            >
              {t.hero.cta} <ChevronRight className="inline w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t.about.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 h-96 flex items-center justify-center mb-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-gray-600">Temple Image Placeholder</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-orange-800 mb-4 flex items-center">
                  <Calendar className="w-6 h-6 mr-3 text-orange-600" />
                  {t.about.history}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.about.historyText}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-orange-800 mb-4 flex items-center">
                  <Heart className="w-6 h-6 mr-3 text-orange-600" />
                  {t.about.significance}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.about.significanceText}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-orange-800 mb-4 flex items-center">
                  <Star className="w-6 h-6 mr-3 text-orange-600" />
                  {t.about.deity}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.about.deityText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Darshan Timings */}
      <section id="darshan" className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Darshan Timings
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Clock className="w-8 h-8 text-orange-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Daily Darshan</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Morning</span>
                  <span className="font-semibold text-gray-800">5:30 AM - 12:30 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Evening</span>
                  <span className="font-semibold text-gray-800">3:00 PM - 9:30 PM</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Star className="w-8 h-8 text-orange-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Special Poojas</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Rahu Kala Pooja</span>
                  <span className="font-semibold text-gray-800">Daily</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Abhishekam</span>
                  <span className="font-semibold text-gray-800">6:00 AM</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <Calendar className="w-8 h-8 text-orange-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Festival Days</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Maha Shivaratri</span>
                  <span className="font-semibold text-gray-800">Extended Hours</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Karthika Masam</span>
                  <span className="font-semibold text-gray-800">Special Timing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Services */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Online Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Book Darshan</h3>
              <p className="text-gray-600 mb-6">Reserve your darshan slot online and avoid waiting in queues.</p>
              <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all">
                Book Now
              </button>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Pooja Offerings</h3>
              <p className="text-gray-600 mb-6">Book special poojas and rituals for your spiritual needs.</p>
              <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all">
                Book Pooja
              </button>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:scale-105 md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Donations</h3>
              <p className="text-gray-600 mb-6">Contribute to temple maintenance and spiritual activities.</p>
              <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all">
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Temple Gallery
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <div className="h-48 bg-gradient-to-br from-orange-200 to-yellow-200 flex items-center justify-center">
                  {item % 2 === 0 ? (
                    <Video className="w-12 h-12 text-orange-600" />
                  ) : (
                    <Camera className="w-12 h-12 text-orange-600" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {item % 2 === 0 ? 'Temple Video' : 'Temple Photo'} {item}
                  </h3>
                  <p className="text-gray-600">
                    {item % 2 === 0 ? 'Watch beautiful rituals and ceremonies' : 'View stunning architecture and deities'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section id="news" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              News & Events
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-orange-800 flex items-center">
                <Bell className="w-6 h-6 mr-3" />
                Latest Announcements
              </h3>
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6 border-l-4 border-orange-500">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-800">Temple Announcement {item}</h4>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-gray-600">Important information about upcoming events and changes in temple timings.</p>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-orange-800 flex items-center">
                <Calendar className="w-6 h-6 mr-3" />
                Upcoming Festivals
              </h3>
              {[
                { name: 'Maha Shivaratri', date: 'March 8, 2025', status: 'Upcoming' },
                { name: 'Karthika Masam', date: 'November 15, 2024', status: 'Ongoing' },
                { name: 'Pradosha Vratam', date: 'December 1, 2024', status: 'Next Month' }
              ].map((festival, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{festival.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      festival.status === 'Ongoing' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {festival.status}
                    </span>
                  </div>
                  <p className="text-gray-600">{festival.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section id="contact" className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Contact & Location
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 text-orange-600 mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Address</h4>
                      <p className="text-gray-600">Sri Kalahasti, Chittoor District, Andhra Pradesh, India - 517644</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-orange-600 mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Phone</h4>
                      <p className="text-gray-600">+91-8572-287000</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-orange-600 mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600">info@srikalahasti.org</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg mt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Message</h3>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  ></textarea>
                  <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all">
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Temple Location</h3>
                <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                    <p className="text-gray-600">Interactive Map</p>
                    <p className="text-sm text-gray-500">Click to view in Google Maps</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Devotee Resources */}
      <section id="resources" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Devotee Resources
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Sacred Mantras</h3>
              <p className="text-gray-600 mb-4">Listen to powerful mantras and chants dedicated to Lord Shiva and Goddess Parvati.</p>
              <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors flex items-center">
                Listen Now <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Temple Brochures</h3>
              <p className="text-gray-600 mb-4">Download informative brochures about temple history, festivals, and rituals.</p>
              <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors flex items-center">
                Download <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 hover:shadow-xl transition-all md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Spiritual Articles</h3>
              <p className="text-gray-600 mb-4">Read inspiring articles about devotion, spirituality, and temple traditions.</p>
              <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors flex items-center">
                Read More <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Sri Kalahasti</h3>
                  <p className="text-sm text-gray-400">Divine Temple</p>
                </div>
              </div>
              <p className="text-gray-400">
                Experience divine blessings at one of India's most sacred Shaiva temples.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                
                <li><button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white transition-colors">About Temple</button></li>
                <li><button onClick={() => scrollToSection('darshan')} className="text-gray-400 hover:text-white transition-colors">Darshan Timings</button></li>
                <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors">Online Services</button></li>
                <li><button onClick={() => scrollToSection('gallery')} className="text-gray-400 hover:text-white transition-colors">Gallery</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-400">
                  <Phone className="w-4 h-4 mr-2" />
                  +91-8572-287000
                </li>
                <li className="flex items-center text-gray-400">
                  <Mail className="w-4 h-4 mr-2" />
                  info@srikalahasti.org
                </li>
                <li className="flex items-start text-gray-400">
                  <MapPin className="w-4 h-4 mr-2 mt-1" />
                  Sri Kalahasti, Chittoor District, AP
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Temple Hours</h4>
              <ul className="space-y-3 text-gray-400">
                <li>Morning: 5:30 AM - 12:30 PM</li>
                <li>Evening: 3:00 PM - 9:30 PM</li>
                <li>All days of the week</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Sri Kalahasti Temple. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button 
          onClick={() => scrollToSection('services')}
          className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 animate-pulse"
        >
          <Heart className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default App;