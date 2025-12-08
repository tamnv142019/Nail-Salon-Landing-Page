import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'vi' | 'fr' | 'es' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.services': 'Services',
    'nav.gallery': 'Gallery',
    'nav.reviews': 'Reviews',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.badge': 'Your Story Begins Here',
    'hero.title1': 'Discover Your',
    'hero.word1': 'Beauty',
    'hero.word2': 'Elegance',
    'hero.word3': 'Confidence',
    'hero.word4': 'You',
    'hero.subtitle': 'Every journey to beauty starts with a single step. Let us guide you through an experience that transforms not just your nails, but how you feel.',
    'hero.cta1': 'Begin Your Journey',
    'hero.cta2': 'Explore Our Story',
    'hero.stat1': 'Years of Excellence',
    'hero.stat2': 'Happy Clients',
    'hero.stat3': 'Star Rating',
    'hero.scroll': 'Scroll to continue',
    
    // Story Transitions
    'story.chapter1.number': 'Chapter One',
    'story.chapter1.title': 'Your Perfect Service Awaits',
    'story.chapter1.subtitle': 'Every masterpiece begins with the right foundation. Discover the service that tells your unique story.',
    'story.chapter2.number': 'Chapter Two',
    'story.chapter2.title': 'Where Art Meets Elegance',
    'story.chapter2.subtitle': 'See the transformation. Feel the difference. Experience the artistry that makes every visit unforgettable.',
    'story.chapter3.number': 'Chapter Three',
    'story.chapter3.title': 'Stories from Our Family',
    'story.chapter3.subtitle': 'Real people. Real transformations. Real confidence. These are the stories that inspire us every day.',
    'story.chapter4.number': 'Final Chapter',
    'story.chapter4.title': 'Begin Your Story Today',
    'story.chapter4.subtitle': 'Your transformation is just one appointment away. Let\'s write your next chapter together.',
    
    // Services
    'services.tagline': 'YOUR SATISFACTION DESERVES OUR ATTENTION',
    'services.manicure': 'Manicure',
    'services.pedicure': 'Pedicure',
    'services.gelx': 'Gel-X Extensions',
    'services.nailart': 'Nail Art & Design',
    
    // Manicure Tiers
    'manicure.regular': 'Regular Manicure',
    'manicure.regular.desc': 'Classic nail care with essential treatments',
    'manicure.european': 'European Manicure',
    'manicure.european.1': 'Exfoliates - exfoliating crystal',
    'manicure.european.2': 'Deep moisturization - Special Lotion',
    'manicure.deluxe': 'Deluxe Manicure',
    'manicure.deluxe.1': 'Exfoliates - exfoliating crystal',
    'manicure.deluxe.2': 'Deep moisturization - Special Lotion',
    'manicure.deluxe.3': 'Rejuvenate - Marine Mask',
    'manicure.signature': 'Signature Spa Manicure',
    'manicure.signature.1': 'Exfoliates - exfoliating crystal',
    'manicure.signature.2': 'Rejuvenate - Marine Mask',
    'manicure.signature.3': 'Deep moisturization - Special Lotion',
    'manicure.signature.4': 'Deep Penetration - Paraffin Wax',
    'manicure.signature.5': '10 Minutes Massage - Warming Lotion',
    
    // Contact
    'contact.location': 'Location',
    'contact.phone': 'Phone',
    'contact.reservation': 'RESERVATION',
    'contact.email': 'Email',
    'contact.hours': 'Hours',
    'contact.address': '4869 Santa Monica Ave\nSan Diego, CA 92107\nUSA',
    'contact.phone.number': '(619) 224-5050',
    'contact.view.map': 'View on Google Maps',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'Phone Number',
    'contact.form.message': 'Your Message',
    'contact.form.send': 'Send Message',
    
    // Booking
    'booking.title': 'Book Your Appointment',
    'booking.subtitle': 'Experience luxury nail care',
    'booking.step1': 'Select Service',
    'booking.step2': 'Choose Date & Time',
    'booking.step3': 'Your Information',
    'booking.next': 'Next Step',
    'booking.back': 'Back',
    'booking.confirm': 'Confirm Booking',
    
    // Footer
    'footer.description': 'Experience luxury nail care with premium services and professional artistry.',
    'footer.quick': 'Quick Links',
    'footer.follow': 'Follow Us',
    'footer.newsletter': 'Newsletter',
    'footer.newsletter.desc': 'Subscribe to receive special offers and beauty tips.',
    'footer.subscribe': 'Subscribe',
    'footer.rights': 'All rights reserved.',
    
    // Common
    'common.book': 'Book Now',
    'common.learnmore': 'Learn More',
  },
  
  vi: {
    // Navigation
    'nav.services': 'Dịch Vụ',
    'nav.gallery': 'Thư Viện',
    'nav.reviews': 'Đánh Giá',
    'nav.contact': 'Liên Hệ',
    
    // Hero
    'hero.badge': 'Câu Chuyện Của Bạn Bắt Đầu Tại Đây',
    'hero.title1': 'Khám Phá',
    'hero.word1': 'Vẻ Đẹp',
    'hero.word2': 'Thanh Lịch',
    'hero.word3': 'Tự Tin',
    'hero.word4': 'Chính Bạn',
    'hero.subtitle': 'Mọi hành trình đến vẻ đẹp đều bắt đầu từ một bước đi. Hãy để chúng tôi dẫn dắt bạn qua trải nghiệm không chỉ thay đổi móng tay mà còn thay đổi cảm nhận của bạn.',
    'hero.cta1': 'Bắt Đầu Hành Trình',
    'hero.cta2': 'Khám Phá Câu Chuyện',
    'hero.stat1': 'Năm Kinh Nghiệm',
    'hero.stat2': 'Khách Hàng Hài Lòng',
    'hero.stat3': 'Đánh Giá Sao',
    'hero.scroll': 'Cuộn để tiếp tục',
    
    // Story Transitions
    'story.chapter1.number': 'Chương Một',
    'story.chapter1.title': 'Dịch Vụ Hoàn Hảo Đang Chờ Bạn',
    'story.chapter1.subtitle': 'Mỗi kiệt tác đều bắt đầu với nền tảng đúng đắn. Khám phá dịch vụ kể câu chuyện riêng của bạn.',
    'story.chapter2.number': 'Chương Hai',
    'story.chapter2.title': 'Nơi Nghệ Thuật Gặp Gỡ Thanh Lịch',
    'story.chapter2.subtitle': 'Nhìn thấy sự thay đổi. Cảm nhận sự khác biệt. Trải nghiệm nghệ thuật làm mỗi lần ghé thăm trở nên khó quên.',
    'story.chapter3.number': 'Chương Ba',
    'story.chapter3.title': 'Câu Chuyện Từ Gia Đình Chúng Tôi',
    'story.chapter3.subtitle': 'Con người thật. Thay đổi thật. Tự tin thật. Đây là những câu chuyện truyền cảm hứng cho chúng tôi mỗi ngày.',
    'story.chapter4.number': 'Chương Cuối',
    'story.chapter4.title': 'Bắt Đầu Câu Chuyện Của Bạn Hôm Nay',
    'story.chapter4.subtitle': 'Sự thay đổi của bạn chỉ cách một cuộc hẹn. Hãy cùng viết chương tiếp theo.',
    
    // Services
    'service.manicure': 'Manicure Cổ Điển',
    'service.manicure.desc': 'Chăm sóc móng truyền thống với tạo hình, chăm sóc da và sơn móng.',
    'service.gel': 'Manicure Gel',
    'service.gel.desc': 'Sơn gel bền lâu với đèn UV/LED giữ màu đến 3 tuần.',
    'service.pedicure': 'Pedicure Spa',
    'service.pedicure.desc': 'Liệu trình chăm sóc chân cao cấp với tẩy tế bào chết, massage và sơn móng.',
    'service.nailart': 'Thiết Kế Nail Art',
    'service.nailart.desc': 'Nghệ thuật móng tùy chỉnh và thiết kế sáng tạo thể hiện phong cách riêng của bạn.',
    'service.discover': 'Khám phá câu chuyện →',
    'service.consultation': 'Nhận Tư Vấn Miễn Phí',
    'service.choosing': 'Vẫn đang lựa chọn? Hãy để chúng tôi hướng dẫn bạn.',
    
    // CTA Banner
    'cta.badge': 'Ưu Đãi Có Hạn',
    'cta.title1': 'Câu Chuyện Của Bạn Xứng Đáng',
    'cta.title2': 'Khởi Đầu Tốt Nhất',
    'cta.subtitle': 'Bắt đầu sự thay đổi ngay hôm nay với giảm giá 20% cho lần đầu. Vì mỗi câu chuyện đẹp đều bắt đầu từ một bước đi.',
    'cta.book': 'Bắt Đầu Ngay Hôm Nay',
    'cta.explore': 'Khám Phá Dịch Vụ',
    'cta.badge1': 'Chuyên Gia Có Giấy Phép',
    'cta.badge2': 'Sản Phẩm Cao Cấp',
    'cta.badge3': 'Đánh Giá 5 Sao',
    
    // Testimonials
    'testimonial.title': 'Câu Chuyện Khách Hàng',
    'testimonial.subtitle': 'Nghe từ khách hàng hài lòng',
    
    // Contact
    'contact.location': 'Địa Điểm',
    'contact.phone': 'Điện Thoại',
    'contact.email': 'Email',
    'contact.hours': 'Giờ Làm Việc',
    'contact.form.name': 'Tên Của Bạn',
    'contact.form.email': 'Địa Chỉ Email',
    'contact.form.phone': 'Số Điện Thoại',
    'contact.form.message': 'Tin Nhắn',
    'contact.form.send': 'Gửi Tin Nhắn',
    
    // Booking
    'booking.title': 'Đặt Lịch Hẹn',
    'booking.subtitle': 'Trải nghiệm chăm sóc móng cao cấp',
    'booking.step1': 'Chọn Dịch Vụ',
    'booking.step2': 'Chọn Ngày & Giờ',
    'booking.step3': 'Thông Tin Của Bạn',
    'booking.next': 'Bước Tiếp Theo',
    'booking.back': 'Quay Lại',
    'booking.confirm': 'Xác Nhận Đặt Lịch',
    
    // Footer
    'footer.description': 'Trải nghiệm chăm sóc móng cao cấp với dịch vụ premium và nghệ thuật chuyên nghiệp.',
    'footer.quick': 'Liên Kết Nhanh',
    'footer.follow': 'Theo Dõi Chúng Tôi',
    'footer.newsletter': 'Bản Tin',
    'footer.newsletter.desc': 'Đăng ký để nhận ưu đãi đặc biệt và mẹo làm đẹp.',
    'footer.subscribe': 'Đăng Ký',
    'footer.rights': 'Bảo lưu mọi quyền.',
    
    // Common
    'common.book': 'Đặt Lịch',
    'common.learnmore': 'Tìm Hiểu Thêm',
  },
  
  fr: {
    // Navigation
    'nav.services': 'Services',
    'nav.gallery': 'Galerie',
    'nav.reviews': 'Avis',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.badge': 'Votre Histoire Commence Ici',
    'hero.title1': 'Découvrez Votre',
    'hero.word1': 'Beauté',
    'hero.word2': 'Élégance',
    'hero.word3': 'Confiance',
    'hero.word4': 'Vous',
    'hero.subtitle': 'Chaque voyage vers la beauté commence par un seul pas. Laissez-nous vous guider à travers une expérience qui transforme non seulement vos ongles, mais aussi ce que vous ressentez.',
    'hero.cta1': 'Commencez Votre Voyage',
    'hero.cta2': 'Découvrez Notre Histoire',
    'hero.stat1': 'Années d\'Excellence',
    'hero.stat2': 'Clients Satisfaits',
    'hero.stat3': 'Note Étoiles',
    'hero.scroll': 'Faites défiler pour continuer',
    
    // Story Transitions
    'story.chapter1.number': 'Chapitre Un',
    'story.chapter1.title': 'Votre Service Parfait Vous Attend',
    'story.chapter1.subtitle': 'Chaque chef-d\'œuvre commence par la bonne fondation. Découvrez le service qui raconte votre histoire unique.',
    'story.chapter2.number': 'Chapitre Deux',
    'story.chapter2.title': 'Où l\'Art Rencontre l\'Élégance',
    'story.chapter2.subtitle': 'Voyez la transformation. Ressentez la différence. Vivez l\'art qui rend chaque visite inoubliable.',
    'story.chapter3.number': 'Chapitre Trois',
    'story.chapter3.title': 'Histoires de Notre Famille',
    'story.chapter3.subtitle': 'De vraies personnes. De vraies transformations. De vraie confiance. Ce sont les histoires qui nous inspirent chaque jour.',
    'story.chapter4.number': 'Dernier Chapitre',
    'story.chapter4.title': 'Commencez Votre Histoire Aujourd\'hui',
    'story.chapter4.subtitle': 'Votre transformation n\'est qu\'à un rendez-vous. Écrivons votre prochain chapitre ensemble.',
    
    // Services
    'service.manicure': 'Manucure Classique',
    'service.manicure.desc': 'Soin des ongles traditionnel avec mise en forme, soin des cuticules et application de vernis.',
    'service.gel': 'Manucure Gel',
    'service.gel.desc': 'Vernis gel longue durée avec durcissement UV/LED jusqu\'à 3 semaines de brillance.',
    'service.pedicure': 'Pédicure Spa',
    'service.pedicure.desc': 'Traitement luxueux des pieds avec exfoliation, massage et vernis.',
    'service.nailart': 'Design Nail Art',
    'service.nailart.desc': 'Art des ongles personnalisé et designs créatifs pour exprimer votre style unique.',
    'service.discover': 'Découvrez votre histoire →',
    'service.consultation': 'Consultation Gratuite',
    'service.choosing': 'Vous hésitez encore? Laissez-nous vous guider.',
    
    // CTA Banner
    'cta.badge': 'Offre Limitée',
    'cta.title1': 'Votre Histoire Mérite',
    'cta.title2': 'Le Meilleur Début',
    'cta.subtitle': 'Commencez votre transformation aujourd\'hui avec 20% de réduction sur votre première visite. Parce que chaque belle histoire commence par un seul pas.',
    'cta.book': 'Commencez Maintenant',
    'cta.explore': 'Découvrir les Services',
    'cta.badge1': 'Professionnels Licenciés',
    'cta.badge2': 'Produits Premium',
    'cta.badge3': 'Noté 5 Étoiles',
    
    // Testimonials
    'testimonial.title': 'Témoignages Clients',
    'testimonial.subtitle': 'Écoutez nos clients satisfaits',
    
    // Contact
    'contact.location': 'Localisation',
    'contact.phone': 'Téléphone',
    'contact.email': 'Email',
    'contact.hours': 'Horaires',
    'contact.form.name': 'Votre Nom',
    'contact.form.email': 'Adresse Email',
    'contact.form.phone': 'Numéro de Téléphone',
    'contact.form.message': 'Votre Message',
    'contact.form.send': 'Envoyer le Message',
    
    // Booking
    'booking.title': 'Réserver Votre Rendez-vous',
    'booking.subtitle': 'Découvrez les soins des ongles de luxe',
    'booking.step1': 'Sélectionner le Service',
    'booking.step2': 'Choisir Date & Heure',
    'booking.step3': 'Vos Informations',
    'booking.next': 'Étape Suivante',
    'booking.back': 'Retour',
    'booking.confirm': 'Confirmer la Réservation',
    
    // Footer
    'footer.description': 'Découvrez les soins des ongles de luxe avec des services premium et un art professionnel.',
    'footer.quick': 'Liens Rapides',
    'footer.follow': 'Suivez-nous',
    'footer.newsletter': 'Newsletter',
    'footer.newsletter.desc': 'Abonnez-vous pour recevoir des offres spéciales et des conseils beauté.',
    'footer.subscribe': 'S\'abonner',
    'footer.rights': 'Tous droits réservés.',
    
    // Common
    'common.book': 'Réserver',
    'common.learnmore': 'En Savoir Plus',
  },
  
  es: {
    // Navigation
    'nav.services': 'Servicios',
    'nav.gallery': 'Galería',
    'nav.reviews': 'Reseñas',
    'nav.contact': 'Contacto',
    
    // Hero
    'hero.badge': 'Tu Historia Comienza Aquí',
    'hero.title1': 'Descubre Tu',
    'hero.word1': 'Belleza',
    'hero.word2': 'Elegancia',
    'hero.word3': 'Confianza',
    'hero.word4': 'Tú',
    'hero.subtitle': 'Cada viaje hacia la belleza comienza con un solo paso. Déjanos guiarte a través de una experiencia que transforma no solo tus uñas, sino cómo te sientes.',
    'hero.cta1': 'Comienza Tu Viaje',
    'hero.cta2': 'Explora Nuestra Historia',
    'hero.stat1': 'Años de Excelencia',
    'hero.stat2': 'Clientes Felices',
    'hero.stat3': 'Calificación Estrellas',
    'hero.scroll': 'Desplázate para continuar',
    
    // Story Transitions
    'story.chapter1.number': 'Capítulo Uno',
    'story.chapter1.title': 'Tu Servicio Perfecto Te Espera',
    'story.chapter1.subtitle': 'Cada obra maestra comienza con la base correcta. Descubre el servicio que cuenta tu historia única.',
    'story.chapter2.number': 'Capítulo Dos',
    'story.chapter2.title': 'Donde el Arte Encuentra la Elegancia',
    'story.chapter2.subtitle': 'Ve la transformación. Siente la diferencia. Experimenta el arte que hace cada visita inolvidable.',
    'story.chapter3.number': 'Capítulo Tres',
    'story.chapter3.title': 'Historias de Nuestra Familia',
    'story.chapter3.subtitle': 'Personas reales. Transformaciones reales. Confianza real. Estas son las historias que nos inspiran cada día.',
    'story.chapter4.number': 'Capítulo Final',
    'story.chapter4.title': 'Comienza Tu Historia Hoy',
    'story.chapter4.subtitle': 'Tu transformación está a solo una cita de distancia. Escribamos tu próximo capítulo juntos.',
    
    // Services
    'service.manicure': 'Manicura Clásica',
    'service.manicure.desc': 'Cuidado de uñas tradicional con forma, cuidado de cutículas y aplicación de esmalte.',
    'service.gel': 'Manicura en Gel',
    'service.gel.desc': 'Esmalte en gel de larga duración con curado UV/LED hasta 3 semanas de brillo.',
    'service.pedicure': 'Pedicura Spa',
    'service.pedicure.desc': 'Tratamiento de pies lujoso con exfoliación, masaje y esmalte.',
    'service.nailart': 'Diseño de Uñas',
    'service.nailart.desc': 'Arte de uñas personalizado y diseños creativos para expresar tu estilo único.',
    'service.discover': 'Descubre tu historia →',
    'service.consultation': 'Consulta Gratuita',
    'service.choosing': '¿Aún eligiendo? Déjanos guiarte.',
    
    // CTA Banner
    'cta.badge': 'Oferta Limitada',
    'cta.title1': 'Tu Historia Merece',
    'cta.title2': 'El Mejor Comienzo',
    'cta.subtitle': 'Comienza tu transformación hoy con 20% de descuento en tu primera visita. Porque cada hermosa historia comienza con un solo paso.',
    'cta.book': 'Comienza Ahora',
    'cta.explore': 'Explorar Servicios',
    'cta.badge1': 'Profesionales Licenciados',
    'cta.badge2': 'Productos Premium',
    'cta.badge3': 'Calificación 5 Estrellas',
    
    // Testimonials
    'testimonial.title': 'Historias de Clientes',
    'testimonial.subtitle': 'Escucha de nuestros clientes felices',
    
    // Contact
    'contact.location': 'Ubicación',
    'contact.phone': 'Teléfono',
    'contact.email': 'Correo',
    'contact.hours': 'Horario',
    'contact.form.name': 'Tu Nombre',
    'contact.form.email': 'Dirección de Correo',
    'contact.form.phone': 'Número de Teléfono',
    'contact.form.message': 'Tu Mensaje',
    'contact.form.send': 'Enviar Mensaje',
    
    // Booking
    'booking.title': 'Reserva Tu Cita',
    'booking.subtitle': 'Experimenta el cuidado de uñas de lujo',
    'booking.step1': 'Seleccionar Servicio',
    'booking.step2': 'Elegir Fecha y Hora',
    'booking.step3': 'Tu Información',
    'booking.next': 'Siguiente Paso',
    'booking.back': 'Atrás',
    'booking.confirm': 'Confirmar Reserva',
    
    // Footer
    'footer.description': 'Experimenta el cuidado de uñas de lujo con servicios premium y arte profesional.',
    'footer.quick': 'Enlaces Rápidos',
    'footer.follow': 'Síguenos',
    'footer.newsletter': 'Boletín',
    'footer.newsletter.desc': 'Suscríbete para recibir ofertas especiales y consejos de belleza.',
    'footer.subscribe': 'Suscribirse',
    'footer.rights': 'Todos los derechos reservados.',
    
    // Common
    'common.book': 'Reservar',
    'common.learnmore': 'Saber Más',
  },
  
  zh: {
    // Navigation
    'nav.services': '服务',
    'nav.gallery': '画廊',
    'nav.reviews': '评论',
    'nav.contact': '联系',
    
    // Hero
    'hero.badge': '您的故事从这里开始',
    'hero.title1': '发现您的',
    'hero.word1': '美丽',
    'hero.word2': '优雅',
    'hero.word3': '自信',
    'hero.word4': '自己',
    'hero.subtitle': '每一段美丽之旅都始于一步。让我们引导您体验不仅改变指甲，更改变感受的旅程。',
    'hero.cta1': '开始您的旅程',
    'hero.cta2': '探索我们的故事',
    'hero.stat1': '年卓越经验',
    'hero.stat2': '满意客户',
    'hero.stat3': '星评分',
    'hero.scroll': '滚动继续',
    
    // Story Transitions
    'story.chapter1.number': '第一章',
    'story.chapter1.title': '您的完美服务等待着您',
    'story.chapter1.subtitle': '每个杰作都始于正确的基础。发现讲述您独特故事的服务。',
    'story.chapter2.number': '第二章',
    'story.chapter2.title': '艺术与优雅的交汇',
    'story.chapter2.subtitle': '看到转变。感受不同。体验让每次访问难忘的艺术。',
    'story.chapter3.number': '第三章',
    'story.chapter3.title': '来自我们家庭的故事',
    'story.chapter3.subtitle': '真实的人。真实的转变。真实的信心。这些是每天激励我们的故事。',
    'story.chapter4.number': '最后一章',
    'story.chapter4.title': '今天开始您的故事',
    'story.chapter4.subtitle': '您的转变只需一次预约。让我们一起书写您的下一章。',
    
    // Services
    'service.manicure': '经典美甲',
    'service.manicure.desc': '传统指甲护理，包括修形、角质层护理和涂抹指甲油。',
    'service.gel': '凝胶美甲',
    'service.gel.desc': '持久凝胶指甲油，UV/LED固化可保持3周光泽。',
    'service.pedicure': 'Spa足疗',
    'service.pedicure.desc': '豪华足部护理，包括去角质、按摩和涂抹指甲油。',
    'service.nailart': '美甲艺术设计',
    'service.nailart.desc': '定制美甲艺术和创意设计，表达您的独特风格。',
    'service.discover': '发现您的故事 →',
    'service.consultation': '获得免费咨询',
    'service.choosing': '还在选择吗？让我们指导您。',
    
    // CTA Banner
    'cta.badge': '限时优惠',
    'cta.title1': '您的故事值得',
    'cta.title2': '最好的开始',
    'cta.subtitle': '今天开始您的转变，首次访问享受20%折扣。因为每个美丽的故事都始于一步。',
    'cta.book': '立即开始',
    'cta.explore': '探索服务',
    'cta.badge1': '持证专业人士',
    'cta.badge2': '优质产品',
    'cta.badge3': '五星评级',
    
    // Testimonials
    'testimonial.title': '客户故事',
    'testimonial.subtitle': '听听我们满意的客户',
    
    // Contact
    'contact.location': '地点',
    'contact.phone': '电话',
    'contact.email': '电子邮件',
    'contact.hours': '营业时间',
    'contact.form.name': '您的姓名',
    'contact.form.email': '电子邮件地址',
    'contact.form.phone': '电话号码',
    'contact.form.message': '您的消息',
    'contact.form.send': '发送消息',
    
    // Booking
    'booking.title': '预约',
    'booking.subtitle': '体验奢华美甲护理',
    'booking.step1': '选择服务',
    'booking.step2': '选择日期和时间',
    'booking.step3': '您的信息',
    'booking.next': '下一步',
    'booking.back': '返回',
    'booking.confirm': '确认预约',
    
    // Footer
    'footer.description': '体验奢华美甲护理，享受优质服务和专业艺术。',
    'footer.quick': '快速链接',
    'footer.follow': '关注我们',
    'footer.newsletter': '通讯',
    'footer.newsletter.desc': '订阅以接收特别优惠和美容提示。',
    'footer.subscribe': '订阅',
    'footer.rights': '保留所有权利。',
    
    // Common
    'common.book': '预约',
    'common.learnmore': '了解更多',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get saved language from localStorage
    const saved = localStorage.getItem('language') as Language;
    return saved || 'en';
  });

  useEffect(() => {
    // Save language preference
    localStorage.setItem('language', language);
    // Update HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}