import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

const translations = {
    en: {
        home: "Home",
        explore: "Explore",
        transport: "Transport",
        hidden_gems: "Hidden Gems",
        plan_trip: "Plan Trip",
        welcome: "Welcome to",
        tagline: "Your personal travel companion powered by AI. Explore destinations, check transport, and uncover hidden secrets.",
        hero_btn: "Start Planning",
        budget_label: "Budget Level",
        economy: "Economy",
        standard: "Standard",
        luxury: "Luxury",
        generate_btn: "Generate Plan",
        planning: "Planning...",
        weather_title: "Weather Forecast",
        safety_title: "Food Safety Tips",
        itinerary_title: "Your Itinerary",
        search_placeholder: "Where to go?",
        days_placeholder: "Days",
        find_gems: "Find Gems",
        famous_spots: "Explore Famous Places",
        famous_tagline: "Discover top attractions and get routes instantly.",
        transport_title: "Public Transport",
        transport_tagline: "Reliable local transport options for your journey.",
        bus_routes: "Bus Routes",
        train_services: "Train Services",
        view_map: "View Map",
        discovered: "Discovered",
    },
    hi: {
        home: "होम",
        explore: "एक्सप्लोर",
        transport: "परिवहन",
        hidden_gems: "छिपे हुए रत्न",
        plan_trip: "यात्रा योजना",
        welcome: "स्वागत है",
        tagline: "एआई द्वारा संचालित आपका व्यक्तिगत यात्रा साथी। गंतव्यों का पता लगाएं, परिवहन की जांच करें और छिपे रहस्यों को उजागर करें।",
        hero_btn: "योजना शुरू करें",
        budget_label: "बजट स्तर",
        economy: "किफायती",
        standard: "मानक",
        luxury: "लक्जरी",
        generate_btn: "योजना बनाएं",
        planning: "योजना बन रही है...",
        weather_title: "मौसम का पूर्वानुमान",
        safety_title: "खाद्य सुरक्षा सुझाव",
        itinerary_title: "आपकी यात्रा कार्यक्रम",
        search_placeholder: "कहाँ जाना है?",
        days_placeholder: "दिन",
        find_gems: "रत्न खोजें",
        famous_spots: "प्रसिद्ध स्थानों का अन्वेषण करें",
        famous_tagline: "शीर्ष आकर्षण खोजें और तुरंत मार्ग प्राप्त करें।",
        transport_title: "सार्वजनिक परिवहन",
        transport_tagline: "आपकी यात्रा के लिए विश्वसनीय स्थानीय परिवहन विकल्प।",
        bus_routes: "बस मार्ग",
        train_services: "ट्रेन सेवाएं",
        view_map: "मानचित्र देखें",
        discovered: "खोजा गया",
    },
    es: {
        home: "Inicio",
        explore: "Explorar",
        transport: "Transporte",
        hidden_gems: "Gemas Ocultas",
        plan_trip: "Planear Viaje",
        welcome: "Bienvenidos a",
        tagline: "Tu compañero de viaje personal potenciado por IA. Explora destinos, consulta transporte y descubre secretos ocultos.",
        hero_btn: "Empezar a Planificar",
        budget_label: "Nivel de Presupuesto",
        economy: "Económico",
        standard: "Estándar",
        luxury: "Lujo",
        generate_btn: "Generar Plan",
        planning: "Planificando...",
        weather_title: "Pronóstico del Tiempo",
        safety_title: "Consejos de Seguridad Alimentaria",
        itinerary_title: "Tu Itinerario",
        search_placeholder: "¿A dónde ir?",
        days_placeholder: "Días",
        find_gems: "Buscar Gemas",
        famous_spots: "Explorar Lugares Famosos",
        famous_tagline: "Descubre las mejores atracciones y obtén rutas al instante.",
        transport_title: "Transporte Público",
        transport_tagline: "Opciones de transporte local confiables para tu viaje.",
        bus_routes: "Rutas de Autobús",
        train_services: "Servicios de Tren",
        view_map: "Ver Mapa",
        discovered: "Descubierto",
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
