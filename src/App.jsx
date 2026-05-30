import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  CakeSlice,
  ChevronRight,
  Coffee,
  FileText,
  Heart,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Star,
  Utensils,
  X,
} from 'lucide-react';

const appBase = import.meta.env.BASE_URL || '/';
const withBase = (path) => `${appBase.replace(/\/?$/, '/')}${path.replace(/^\/+/, '')}`;
const asset = (name) => withBase(`assets/${name.replace('.png', '.jpg')}`);
const menuPdfUrl = withBase('assets/menu-tartelier-julio-2025.pdf');

// NOTA: los archivos de imagen tienen nombres que NO coinciden con su contenido
// real (vinieron mezclados). Cada clave apunta al archivo que SÍ contiene la foto
// correcta; el comentario indica qué muestra de verdad ese archivo.
const photos = {
  hero: asset('pannecook.jpg'), // "Un día entero en tartelier" (foto principal)
  espresso: asset('bocata-caprese.jpg'), // Espresso
  limonadaRosas: asset('exotique-close.jpg'), // Limonada de rosas 10/10
  bebidaFria: asset('sanduche-pollo.jpg'), // Bebida fría morada (limonada)
  latteCapas: asset('bagel-philadelphia.jpg'), // Latte en capas
  fragolina: asset('desayuno-tartelier.jpg'), // Postre Fragolina
  noisette: asset('bagel-ranchero.jpg'), // Postre Noisette
  citron: asset('ensalada-cesar.jpg'), // Postre Citrón
  euphoria: asset('ensalada-caprese.jpg'), // Postre Euphoria
  exotique: asset('sopa-cebolla.jpg'), // Postre Exotique
  strudel: asset('strudel-euphoria.jpg'), // Strudel de manzana (collage)
  cookie: asset('postre-cacao.jpg'), // Chocolate Chip Cookie
  chocolate: asset('desayuno-parisino.jpg'), // Postre de chocolate
  postresMesa: asset('bagel.jpg'), // Collage de postres de autor
  postresQuiz: asset('postres-plato.jpg'), // Collage vitrina de postres
  brunchParisino: asset('postre-chocolate.jpg'), // Desayuno Parisino
  brunchTartelier: asset('fragolina.jpg'), // Desayuno Tartelier
  bagelRanchero: asset('noisette.jpg'), // Bagel Ranchero
  bagelPhiladelphia: asset('latte-capas.jpg'), // Bagel Philadelphia
  bagel: asset('postres-quiz.jpg'), // Bagel (semillas)
  pannecook: asset('dia-tartelier.jpg'), // Pannecook (pan cuenco)
  almuerzos: asset('noisette-close.jpg'), // Collage "Tantas opciones de almuerzo"
  sopaCebolla: asset('exotique.jpg'), // Sopa de cebolla
  ensaladaCaprese: asset('euphoria.jpg'), // Ensalada Caprese
  ensaladaCesar: asset('citron.jpg'), // Ensalada César
  bocataCaprese: asset('espresso.jpg'), // Bocata Caprese
  sanduchePollo: asset('limonada-viernes.jpg'), // Sánduche de pollo
  citronExotique: asset('noisette-fragolina.jpg'), // Collage "Citrón o Exotique"
  noisetteFragolina: asset('citron-exotique.jpg'), // Collage "Noisette o Fragolina"
};

const TARTELIER_INSTAGRAM_URL = 'https://www.instagram.com/tartelier_ec/';
const TARTELIER_MAPS_URL = 'https://www.google.com/maps?q=-1.251083,-78.640111';
const TARTELIER_COORDINATES = '1°15\'03.9"S 78°38\'24.4"W';
const PITTAHAYA_URL = 'https://www.pittahaya.com';

const navItems = [
  ['Carta', '/carta'],
  ['Postres', '/postres'],
  ['Bebidas', '/bebidas'],
  ['Brunch', '/brunch'],
  ['Almuerzos', '/almuerzos'],
  ['Experiencia', '/experiencia'],
  ['Ambato', '/ubicacion'],
];

const routeMeta = {
  '/': {
    eyebrow: 'Home',
    title: 'Tartelier',
  },
  '/carta': {
    eyebrow: 'Carta',
    title: 'Menú real para desayunar, brunchear, almorzar y acompañar con café.',
  },
  '/postres': {
    eyebrow: 'Postres de autor',
    title: 'Piezas que se eligen primero con los ojos.',
  },
  '/bebidas': {
    eyebrow: 'Café y bebidas',
    title: 'Del espresso al rosa suave de la limonada.',
  },
  '/brunch': {
    eyebrow: 'Desayunos y brunch',
    title: 'Para empezar despacio y quedarse un poco más.',
  },
  '/almuerzos': {
    eyebrow: 'Almuerzos',
    title: 'Salados selectos con emplatado de cafetería premium.',
  },
  '/experiencia': {
    eyebrow: 'Experiencia',
    title: 'Una mesa donde cada plato tiene intención.',
  },
  '/ubicacion': {
    eyebrow: 'Ambato',
    title: 'Tartelier en Ambato, Ecuador.',
  },
};

const dessertItems = [
  {
    name: 'Fragolina',
    category: 'Postre de autor',
    image: photos.fragolina,
    description: 'Una fresa delicada, brillante y suave, pensada para quienes aman un dulce fresco y memorable.',
    accent: 'bg-berry',
  },
  {
    name: 'Noisette',
    category: 'Avellana y chocolate',
    image: photos.noisette,
    description: 'Silueta de nuez, acabado satinado y un perfil cálido que se siente elegante desde el primer vistazo.',
    accent: 'bg-honey',
  },
  {
    name: 'Citrón',
    category: 'Cítrico delicado',
    image: photos.citron,
    description: 'Limpio, luminoso y fresco. Un postre amarillo cítrico para cerrar el día con ligereza.',
    accent: 'bg-citron',
  },
  {
    name: 'Euphoria',
    category: 'Frutal brillante',
    image: photos.euphoria,
    description: 'Una pieza roja de acabado espejo, clásica en espíritu y con presencia de vitrina.',
    accent: 'bg-berry',
  },
  {
    name: 'Exotique',
    category: 'Mango y notas frutales',
    image: photos.exotique,
    description: 'Color mango, brillo generoso y una personalidad alegre sin perder la finura Tartelier.',
    accent: 'bg-mango',
  },
  {
    name: 'Strudel de manzana',
    category: 'Hojaldre artesanal',
    image: photos.strudel,
    description: 'Capas doradas, manzana y azúcar glass. Un clásico con gesto casero y emplatado cuidado.',
    accent: 'bg-wood',
  },
  {
    name: 'Chocolate Chip Cookie',
    category: 'Snack dulce',
    image: photos.cookie,
    description: 'Galleta artesanal con chips de chocolate, perfecta para acompañar café o leche.',
    accent: 'bg-honey',
  },
  {
    name: 'Postre de chocolate',
    category: 'Individual de autor',
    image: photos.chocolate,
    description: 'Base delicada, crema de chocolate y detalle crujiente. Sobrio, goloso y muy fotogénico.',
    accent: 'bg-wood',
  },
];

const drinks = [
  {
    name: 'Espresso',
    image: photos.espresso,
    copy: 'Corto, intenso y servido con esa calma que abre la mañana.',
    price: 'desde $ 2,30',
    icon: Coffee,
  },
  {
    name: 'Limonada de rosas',
    image: photos.limonadaRosas,
    copy: 'Rosa pálido, pétalos y limón. Refrescante, floral y 10/10 para acompañar brunch.',
    price: '$ 3,50',
    icon: Sparkles,
  },
  {
    name: 'Latte en capas',
    image: photos.latteCapas,
    copy: 'Capas suaves, espuma cremosa y una estética cálida de cafetería boutique.',
    price: '$ 4,00',
    icon: Coffee,
  },
  {
    name: 'Bebidas frías artesanales',
    image: photos.bebidaFria,
    copy: 'Opciones coloridas para acompañar salados, brunch y postres sin perder delicadeza.',
    price: 'desde $ 3,50',
    icon: Sparkles,
  },
];

const brunchItems = [
  {
    name: 'Desayuno Parisino',
    image: photos.brunchParisino,
    description: 'Pan dorado, frutos rojos, crema y miel. Un inicio dulce con aire francés contemporáneo.',
    price: '$ 9,00',
  },
  {
    name: 'Desayuno Tartelier',
    image: photos.brunchTartelier,
    description: 'Una experiencia completa para quedarse: café, pan, bebida fría y un plato cálido al centro.',
    price: '$ 9,00',
  },
  {
    name: 'Bagel Ranchero',
    image: photos.bagelRanchero,
    description: 'Bagel con huevo, tocino, queso y ensalada fresca. Brunch con carácter y color.',
    price: '$ 9,00',
  },
  {
    name: 'Bagel Philadelphia',
    image: photos.bagelPhiladelphia,
    description: 'Bagel de salmón, crema y brotes, servido con ensalada y un emplatado luminoso.',
    price: '$ 9,50',
  },
  {
    name: 'Bagel',
    image: photos.bagel,
    description: 'Pan de semillas, relleno generoso y ensalada fresca. Un favorito para media mañana.',
    price: 'desde $ 9,00',
  },
  {
    name: 'Pannecook',
    image: photos.pannecook,
    description: 'Pan redondo servido como cuenco, relleno y acompañado de ensalada fresca.',
    price: 'desde $ 9,50',
  },
];

const lunchItems = [
  {
    name: 'Sopa de cebolla',
    image: photos.sopaCebolla,
    description: 'Cálida, profunda y servida con pan gratinado. Un plato reconfortante con gesto francés.',
    price: '$ 8,50',
  },
  {
    name: 'Ensalada Caprese',
    image: photos.ensaladaCaprese,
    description: 'Mozzarella, tomate, albahaca y finas láminas saladas con trazos de reducción.',
    price: '$ 9,00',
  },
  {
    name: 'Ensalada César',
    image: photos.ensaladaCesar,
    description: 'Lechuga fresca, pollo, crutones y parmesano en una versión limpia y generosa.',
    price: '$ 11,50',
  },
  {
    name: 'Bocata Caprese',
    image: photos.bocataCaprese,
    description: 'Pan crujiente, mozzarella, tomate, albahaca y ensalada con acabado de autor.',
    price: '$ 9,50',
  },
  {
    name: 'Sánduche de pollo',
    image: photos.sanduchePollo,
    description: 'Pollo, queso fundido, hojas frescas y salsa cremosa en un formato abundante.',
    price: '$ 8,50',
  },
];

const menuGroups = [
  {
    title: 'Desayunos',
    note: 'Disponibles de 8:30 a 12:00 pm',
    items: [
      ['Parisino', 'Tostadas francesas caramelizadas, frutos rojos, yogurt griego, frutas, huevo revuelto con champiñón y café o jugo.', '$ 9,00'],
      ['Tartelier', 'Huevos a la cazuela con espinaca, pomodoro, tomate cherry, champiñón, jamón, queso gratinado, pan de masa madre, fruta, granola y miel.', '$ 9,00'],
      ['Banana Bliss', 'Pancakes de banano con fruta de temporada, mantequilla de maní, miel orgánica, huevo revuelto con jamón, café o jugo.', '$ 9,00'],
      ['Vitalité', 'Bowl de yogurt griego con fruta, nibs de cacao, granola de la casa, miel orgánica, huevos revueltos con jamón, café o jugo.', '$ 9,00'],
    ],
  },
  {
    title: 'Light meals',
    items: [
      ['Bowl de acai', 'Base de acai natural, frutos rojos, leche de coco, frutas frescas, granola de la casa, coco rallado, nibs de cacao y miel orgánica.', '$ 6,75'],
      ['Blueberry pancakes', 'Pancakes con arándanos, miel de maple, mantequilla de maní y frutos del bosque.', '$ 7,00'],
    ],
  },
  {
    title: 'Bagels',
    items: [
      ['Gamberi', 'Bagel relleno de camarón, tocino, queso crema, brotes de cebollín y ensalada de la casa.', '$ 9,00'],
      ['Philadelphia', 'Bagel relleno de salmón, salsa cremosa de alcaparras, reducción de balsámico, brotes y ensalada de la casa.', '$ 9,50'],
      ['Ranchero', 'Bagel relleno de huevo frito, jamón, tocino, queso cheddar y ensalada de la casa.', '$ 9,00'],
    ],
  },
  {
    title: 'Panne cook y tartines',
    items: [
      ['Vegetariano', 'Pan campesino de masa madre con estofado cremoso de vegetales y queso gratinado.', '$ 9,50'],
      ['Panne cook strogonof', 'Pan campesino de masa madre, lomo strogonof, queso gratinado, champiñones y ensalada de la casa.', '$ 9,50'],
      ['Panne cook pollo y champiñones', 'Pan campesino de masa madre, pollo en salsa de champiñones, queso gratinado y ensalada de la casa.', '$ 9,50'],
      ['Tartine Aguacate', 'Tocino y huevo revuelto cremoso sobre hogaza de pan de masa madre con ensalada de la casa.', '$ 6,50'],
    ],
  },
  {
    title: 'Sánduches y benedictinas',
    items: [
      ['Virginia Benedictina', 'Jamón virginia, huevos benedict, salsa de yogurt griego y eneldo sobre hogaza de pan de masa madre.', '$ 8,00'],
      ['Salmón Benedictina', 'Hogaza de pan de masa madre, salmón, aguacate, huevos pochados, salsa de yogurt griego y eneldo.', '$ 10,00'],
      ['Bocata Caprese', 'Baguette de masa madre, jamón serrano, tomate deshidratado, burrata, albahaca y balsámico.', '$ 9,50'],
      ['Pollo morrón', 'Pan de masa madre, pollo al grill, tocino, queso holandés y ensalada de la casa.', '$ 8,50'],
      ['Italiano', 'Pan de masa madre, jamón virginia, salami, mayonesa Tartelier, queso holandés y ensalada de la casa.', '$ 8,00'],
      ['Roast beef', 'Pan de masa madre, roast beef, gravy, cebolla caramelizada, champiñones, mostaza dijón y queso holandés.', '$ 9,50'],
      ['Philly Cheesesteak', 'Pan de masa madre, lomo fino, pimiento, cebolla, queso holandés y mayonesa Tartelier.', '$ 9,00'],
    ],
  },
  {
    title: 'Ensaladas y sopa',
    items: [
      ['French onion soup', 'Sopa francesa de cebolla caramelizada, jerez, broth oscuro y pan con queso gruyere gratinado.', '$ 8,50'],
      ['Caesar', 'Lechuga romana, crotones, pechuga al grill, queso parmesano y aderezo caesar.', '$ 11,50'],
      ['Capresse', 'Tomate maduro, fior di latte, albahaca, reducción de balsámico y jamón serrano.', '$ 9,00'],
    ],
  },
  {
    title: 'Té caliente y bebidas frías',
    items: [
      ['Bingo blueberry', 'Té caliente.', '$ 4,00'],
      ['Lucky mango', 'Té caliente.', '$ 4,00'],
      ['Casablanca herbal tea', 'Té caliente.', '$ 4,00'],
      ['Hawaiian colada', 'Té caliente.', '$ 4,00'],
      ['Green matcha', 'Bebida fría.', '$ 4,00'],
      ['Latte tradicional', 'Bebida fría.', '$ 4,00'],
      ['Pink matcha latte', 'Bebida fría.', '$ 4,00'],
      ['Limonada de rosas', 'Bebida fría artesanal.', '$ 3,50'],
      ['Limonada de frambuesa', 'Bebida fría artesanal.', '$ 3,50'],
      ['Limonada de lavanda', 'Bebida fría artesanal.', '$ 3,50'],
    ],
  },
  {
    title: 'Café, smoothies y jugos',
    items: [
      ['Iced caramel machiato', 'Café frío.', '$ 3,50'],
      ['Iced vanilla latte', 'Café frío.', '$ 3,50'],
      ['Iced frapuchino', 'Café frío.', '$ 3,50'],
      ['Iced moka', 'Café frío.', '$ 3,75'],
      ['Orange Coffee', 'Café frío.', '$ 3,50'],
      ['Limonada de café', 'Café frío.', '$ 3,50'],
      ['Chocolate caliente', 'Bebida caliente.', '$ 3,50'],
      ['Capuchino', 'Café caliente.', '$ 2,75'],
      ['Americano', 'Café caliente.', '$ 2,30'],
      ['Espresso doble', 'Café caliente.', '$ 2,30'],
      ['Banano y berries', 'Smoothie.', '$ 3,50'],
      ['Maracuyá y coco', 'Smoothie.', '$ 3,50'],
      ['Shake oreo', 'Shake.', '$ 4,00'],
      ['Mix tropical', 'Jugo.', '$ 3,50'],
      ['Jugo detox', 'Pepino, piña, manzana verde, apio y espinaca.', '$ 4,25'],
      ['Maracuyá y fresa', 'Jugo.', '$ 3,50'],
    ],
  },
];

const gallery = [
  { image: photos.postresMesa, label: 'Postres de autor' },
  { image: photos.hero, label: 'Un día en Tartelier' },
  { image: photos.almuerzos, label: 'Almuerzos selectos' },
  { image: photos.postresQuiz, label: 'Vitrina dulce' },
  { image: photos.noisetteFragolina, label: 'Noisette y Fragolina' },
  { image: photos.citronExotique, label: 'Citrón y Exotique' },
];

function Monogram({ light = false }) {
  return (
    <span
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border ${
        light ? 'border-white/65 text-white' : 'border-navy/25 text-navy'
      } font-display text-4xl leading-none`}
      aria-hidden="true"
    >
      t.
    </span>
  );
}

function SafeImage({ src, alt, className, loading = 'lazy', fallback = photos.hero, ...props }) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading}
      className={className}
      onError={() => {
        if (currentSrc !== fallback) {
          setCurrentSrc(fallback);
        }
      }}
      {...props}
    />
  );
}

function SectionIntro({ eyebrow, title, copy, align = 'left' }) {
  return (
    <div className={`mx-auto max-w-3xl ${align === 'center' ? 'text-center' : ''}`}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-honey">{eyebrow}</p>
      <h2 className="font-display text-4xl leading-tight text-navy text-balance md:text-6xl">{title}</h2>
      {copy ? <p className="mt-5 text-base leading-8 text-ink/72 md:text-lg">{copy}</p> : null}
    </div>
  );
}

function normalizePath(pathname) {
  const cleanPath = pathname.replace(/\/+$/, '');
  return cleanPath || '/';
}

function basePath() {
  try {
    return new URL(appBase, window.location.origin).pathname;
  } catch {
    return appBase;
  }
}

function stripBasePath(pathname) {
  const cleanPath = normalizePath(pathname);
  const cleanBase = normalizePath(basePath());

  if (cleanBase !== '/' && (cleanPath === cleanBase || cleanPath.startsWith(`${cleanBase}/`))) {
    return normalizePath(cleanPath.slice(cleanBase.length) || '/');
  }

  return cleanPath;
}

function routeToUrl(pathname) {
  const routePath = normalizePath(pathname);
  const cleanBase = normalizePath(basePath());
  const rootUrl = cleanBase === '/' ? '/' : `${cleanBase}/`;

  return `${rootUrl}#${routePath}`;
}

function readRoutePath() {
  const hashPath = window.location.hash.replace(/^#/, '').split('?')[0];
  if (hashPath) {
    return normalizePath(hashPath);
  }

  if (window.location.search.startsWith('?/')) {
    const redirectedPath = window.location.search.slice(1).split('&')[0].replace(/~and~/g, '&');
    const routePath = normalizePath(redirectedPath);
    window.history.replaceState({}, '', routeToUrl(routePath));
    return routePath;
  }

  const routePath = stripBasePath(window.location.pathname);
  if (routePath !== '/') {
    window.history.replaceState({}, '', routeToUrl(routePath));
  }

  return routePath;
}

function usePathname() {
  const [pathname, setPathname] = useState(() => readRoutePath());

  useEffect(() => {
    const handleNavigation = () => setPathname(readRoutePath());
    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('hashchange', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('hashchange', handleNavigation);
    };
  }, []);

  return pathname;
}

function SmartLink({ href, children, className, onClick, ...props }) {
  const isInternal = href?.startsWith('/') && !href.startsWith('//');
  const renderedHref = isInternal ? routeToUrl(href) : href;

  function handleClick(event) {
    onClick?.(event);
    if (!isInternal || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    const nextPath = normalizePath(href);
    if (readRoutePath() !== nextPath) {
      window.history.pushState({}, '', routeToUrl(nextPath));
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <a href={renderedHref} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

function PrimaryButton({ children, href, dark = false, ...props }) {
  return (
    <SmartLink
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition ${
        dark
          ? 'bg-navy text-ivory shadow-soft hover:bg-ink'
          : 'bg-ivory text-navy shadow-soft hover:bg-cream'
      }`}
      {...props}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </SmartLink>
  );
}

function GhostButton({ children, href, light = false, ...props }) {
  return (
    <SmartLink
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 text-sm font-semibold transition ${
        light
          ? 'border-white/55 text-white hover:bg-white/12'
          : 'border-navy/20 text-navy hover:bg-navy/5'
      }`}
      {...props}
    >
      {children}
      <ChevronRight className="h-4 w-4" aria-hidden="true" />
    </SmartLink>
  );
}

function ProductCard({ item, compact = false }) {
  return (
    <article className="group overflow-hidden rounded-lg bg-ivory shadow-lift ring-1 ring-navy/8">
      <div className="relative aspect-[4/5] overflow-hidden">
        <SafeImage
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="photo-finish h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        {item.category ? (
          <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-navy">
            {item.category}
          </span>
        ) : null}
      </div>
      <div className="p-5 md:p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${item.accent || 'bg-honey'}`} aria-hidden="true" />
            <h3 className="font-display text-3xl leading-none text-navy">{item.name}</h3>
          </div>
          {item.price ? (
            <span className="shrink-0 rounded-full bg-navy px-3 py-1 text-xs font-bold text-ivory">{item.price}</span>
          ) : null}
        </div>
        <p className="text-sm leading-7 text-ink/70">{item.description}</p>
      </div>
    </article>
  );
}

function Header({ currentPath }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-ivory/86 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8" aria-label="Principal">
        <SmartLink href="/" className="flex items-center gap-3 text-navy">
          <Monogram />
          <span>
            <span className="block font-display text-3xl leading-none">tartelier</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.35em]">Repostería Artesanal</span>
          </span>
        </SmartLink>
        <div className="hidden items-center gap-5 lg:flex">
          {navItems.map(([label, href]) => (
            <SmartLink
              key={label}
              href={href}
              className={`text-sm font-semibold transition hover:text-navy ${
                currentPath === href ? 'text-navy' : 'text-navy/68'
              }`}
            >
              {label}
            </SmartLink>
          ))}
        </div>
        <div className="hidden lg:block">
          <PrimaryButton href={TARTELIER_INSTAGRAM_URL} target="_blank" rel="noreferrer" dark>
            Reservar
          </PrimaryButton>
        </div>
        <button
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open ? (
        <div className="border-t border-navy/10 bg-ivory px-5 py-5 shadow-soft lg:hidden">
          <div className="grid gap-3">
            {navItems.map(([label, href]) => (
              <SmartLink
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className={`rounded-full px-4 py-3 text-sm font-semibold hover:bg-cream ${
                  currentPath === href ? 'bg-cream text-navy' : 'text-navy'
                }`}
              >
                {label}
              </SmartLink>
            ))}
            <PrimaryButton href={TARTELIER_INSTAGRAM_URL} target="_blank" rel="noreferrer" dark>
              Reservar
            </PrimaryButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative min-h-[88svh] overflow-hidden pt-20 text-white">
      <SafeImage
        src={photos.hero}
        alt="Mesa Tartelier con desayuno, bebida fría y postres"
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover object-[center_62%] photo-finish"
      />
      <div className="hero-mask absolute inset-0" />
      <div className="relative z-10 mx-auto flex min-h-[calc(88svh-5rem)] max-w-7xl items-end px-5 pb-14 pt-24 md:px-8 md:pb-20">
        <div className="max-w-3xl reveal">
          <div className="mb-8 flex items-center gap-4">
            <Monogram light />
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-white/80">Ambato, Ecuador</p>
          </div>
          <h1 className="font-display text-6xl leading-[0.9] text-balance md:text-8xl lg:text-9xl">Tartelier</h1>
          <p className="mt-4 text-sm font-bold uppercase tracking-[0.35em] text-white/78">Repostería Artesanal</p>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-white/86 md:text-2xl">
            Postres de autor, café, desayunos, brunch y almuerzos selectos en una experiencia cálida, estética y muy antojable.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href="/carta">Ver carta</PrimaryButton>
            <GhostButton href="/ubicacion" light>
              Visítanos
            </GhostButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandSection() {
  return (
    <section id="sobre" className="bg-ivory px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionIntro
            eyebrow="Sobre Tartelier"
            title="Una repostería boutique con alma artesanal y mirada internacional."
            copy="Tartelier se siente como una pausa cuidada: vitrinas de postres con acabado de joya, café servido con calma, platos salados de emplatado limpio y una atmósfera cálida donde cada detalle importa."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ['Autor', 'Piezas individuales, brillantes y muy visuales.'],
              ['Brunch', 'Desayunos dulces y salados para quedarse.'],
              ['Ambato', 'Identidad local con estética francesa contemporánea.'],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-lg border border-navy/10 bg-cream p-5">
                <p className="font-display text-2xl text-navy">{title}</p>
                <p className="mt-2 text-sm leading-6 text-ink/65">{copy}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <SafeImage
            src={photos.postresMesa}
            alt="Selección de postres de autor Tartelier"
            className="aspect-[4/5] rounded-lg object-cover shadow-lift"
          />
          <SafeImage
            src={photos.limonadaRosas}
            alt="Limonada de rosas Tartelier"
            className="mt-10 aspect-[4/5] rounded-lg object-cover shadow-lift"
          />
        </div>
      </div>
    </section>
  );
}

const homeHighlights = [
  {
    title: 'Carta completa',
    copy: 'Desayunos, bagels, panne cook, sánduches, ensaladas, sopa francesa, café y bebidas con precios reales.',
    image: photos.almuerzos,
    href: '/carta',
    label: 'Ver carta',
  },
  {
    title: 'Postres de autor',
    copy: 'Fragolina, Noisette, Citrón, Euphoria, Exotique, strudel y piezas individuales de vitrina.',
    image: photos.postresMesa,
    href: '/postres',
    label: 'Explorar postres',
  },
  {
    title: 'Brunch y desayunos',
    copy: 'Parisino, Tartelier, bagels y panne cook para empezar el día con calma.',
    image: photos.brunchParisino,
    href: '/brunch',
    label: 'Ver brunch',
  },
  {
    title: 'Café y bebidas',
    copy: 'Espresso, limonada de rosas, matcha, iced coffees, smoothies, shakes y jugos.',
    image: photos.limonadaRosas,
    href: '/bebidas',
    label: 'Ver bebidas',
  },
];

function HomeHighlights() {
  return (
    <section className="bg-cream px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionIntro
            eyebrow="Explorar"
            title="Elige qué se te antoja hoy."
            copy="La web ahora respira por páginas: una entrada visual y caminos claros para mirar carta, postres, bebidas, brunch o almuerzos sin saturarte."
          />
          <GhostButton href="/ubicacion">Planear visita</GhostButton>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {homeHighlights.map((item) => (
            <SmartLink
              key={item.title}
              href={item.href}
              className="group overflow-hidden rounded-lg bg-ivory shadow-lift ring-1 ring-navy/8"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-3xl leading-none text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink/68">{item.copy}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-honey">
                  {item.label}
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  );
}

function FullMenuSection() {
  return (
    <section id="carta" className="bg-navy px-5 py-20 text-ivory md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-honey">Carta julio 2025</p>
            <h2 className="font-display text-4xl leading-tight text-balance md:text-6xl">
              Menú real para desayunar, brunchear, almorzar y acompañar con café.
            </h2>
          </div>
          <div>
            <p className="text-base leading-8 text-white/72 md:text-lg">
              Precios tomados del menú Tartelier proporcionado. La selección mantiene una lectura compacta para web y deja los postres de autor sin precio cuando el PDF no los especifica.
            </p>
            <a
              href={menuPdfUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/35 px-6 text-sm font-semibold text-white transition hover:bg-white/12"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Ver PDF completo
            </a>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {menuGroups.map((group) => (
            <article key={group.title} className="rounded-lg border border-white/12 bg-white/[0.06] p-5 backdrop-blur md:p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-3xl leading-none text-white md:text-4xl">{group.title}</h3>
                  {group.note ? <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-honey">{group.note}</p> : null}
                </div>
                <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-honey/18 text-honey">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
              <div className="grid gap-4">
                {group.items.map(([name, description, price]) => (
                  <div key={`${group.title}-${name}`} className="border-t border-white/10 pt-4">
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-semibold text-white">{name}</p>
                      <p className="shrink-0 font-semibold text-honey">{price}</p>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-white/64">{description}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DessertsSection() {
  return (
    <section id="postres" className="bg-cream px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionIntro
            eyebrow="Postres de autor"
            title="Piezas que se eligen primero con los ojos."
            copy="Frutas brillantes, volúmenes precisos, chocolate, avellana, cítricos y hojaldre. Cada postre tiene una personalidad propia."
          />
          <GhostButton href="/ubicacion">Pedir selección</GhostButton>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dessertItems.map((item) => (
            <ProductCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DrinksSection() {
  return (
    <section id="bebidas" className="bg-ivory px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <SectionIntro
            eyebrow="Café y bebidas"
            title="Del espresso al rosa suave de la limonada."
            copy="La carta líquida acompaña la experiencia sin competir con ella: café intenso, capas cremosas y bebidas frías artesanales con notas florales y cítricas."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {drinks.map(({ name, image, copy, price, icon: Icon }) => (
              <article key={name} className="flex min-h-full flex-col overflow-hidden rounded-lg bg-cream shadow-lift ring-1 ring-navy/8">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <SafeImage src={image} alt={name} loading="lazy" className="h-full w-full object-cover object-center photo-finish" />
                  <span className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-ivory/92 text-navy">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="min-w-0 flex-1 font-display text-4xl leading-[0.95] text-navy">{name}</h3>
                    <span className="shrink-0 whitespace-nowrap rounded-full bg-navy px-3 py-1 text-xs font-bold text-ivory">{price}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-ink/68">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BrunchSection() {
  return (
    <section id="brunch" className="bg-navy px-5 py-20 text-ivory md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-honey">Desayunos y brunch</p>
            <h2 className="font-display text-4xl leading-tight text-balance md:text-6xl">Para empezar despacio, quedarse un poco más y pedir algo dulce después.</h2>
          </div>
          <p className="text-base leading-8 text-white/72 md:text-lg">
            Bagels, pannecook y desayunos con frutas, café y bebidas frías. Una carta pensada para la mañana y el mediodía.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {brunchItems.map((item) => (
            <ProductCard key={item.name} item={{ ...item, category: 'Brunch' }} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

function LunchSection() {
  return (
    <section id="almuerzos" className="bg-ivory px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionIntro
            eyebrow="Almuerzos y salados"
            title="Platos selectos con emplatado de cafetería premium."
            copy="Opciones frescas, cálidas y generosas para almorzar en Ambato sin salir de la atmósfera Tartelier."
          />
          <PrimaryButton href="/ubicacion" dark>
            Consultar disponibilidad
          </PrimaryButton>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {lunchItems.map((item) => (
            <article key={item.name} className="group overflow-hidden rounded-lg bg-cream shadow-lift ring-1 ring-navy/8 lg:odd:translate-y-8">
              <div className="aspect-[4/5] overflow-hidden">
                <SafeImage src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-honey">Almuerzo</p>
                <div className="mt-2 flex items-start justify-between gap-3">
                  <h3 className="font-display text-3xl leading-none text-navy">{item.name}</h3>
                  <span className="shrink-0 rounded-full bg-navy px-3 py-1 text-xs font-bold text-ivory">{item.price}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-ink/68">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="grain overflow-hidden bg-linen px-5 py-20 md:px-8 md:py-28">
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="relative">
          <SafeImage
            src={photos.almuerzos}
            alt="Mesa de almuerzo Tartelier con varias opciones saladas"
            loading="lazy"
            className="aspect-[5/4] rounded-lg object-cover shadow-lift"
          />
          <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/30 bg-navy/78 p-5 text-ivory backdrop-blur">
            <p className="font-display text-3xl">Boutique, cálido y visual.</p>
            <p className="mt-2 text-sm leading-6 text-white/72">Un lugar para desayunar, brunchear, almorzar y terminar con un postre de vitrina.</p>
          </div>
        </div>
        <div>
          <SectionIntro
            eyebrow="La experiencia"
            title="Una mesa donde cada plato tiene intención."
            copy="La estética de Tartelier vive en la madera cálida, la vajilla blanca, los colores de fruta y la luz suave. No se siente rígido: se siente delicado, cercano y listo para compartir."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              [CakeSlice, 'Postres con acabado brillante y formas reconocibles.'],
              [Coffee, 'Café y bebidas frías para acompañar cualquier hora.'],
              [Utensils, 'Salados con ensaladas frescas y emplatado cuidado.'],
              [Heart, 'Copy cercano, apetitoso y con personalidad de marca.'],
            ].map(([Icon, text]) => (
              <div key={text} className="flex items-start gap-3 rounded-lg bg-ivory/72 p-4">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-honey" aria-hidden="true" />
                <p className="text-sm leading-6 text-ink/72">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="bg-ivory px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Galería"
          title="Fotografía cálida, editorial y profundamente gastronómica."
          copy="La imagen debe ser protagonista: platos cercanos, fondos suavemente desenfocados, luz cálida y composición limpia."
          align="center"
        />
        <div className="mt-12 grid auto-rows-[260px] gap-4 md:grid-cols-4 md:auto-rows-[320px]">
          {gallery.map((item, index) => (
            <figure
              key={item.label}
              className={`group relative overflow-hidden rounded-lg shadow-lift ${
                index === 0 || index === 2 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <SafeImage src={item.image} alt={item.label} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/72 to-transparent p-5 font-display text-2xl text-white">
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section id="ubicacion" className="bg-cream px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-lg bg-navy p-8 text-ivory shadow-soft md:p-10">
          <MapPin className="mb-6 h-8 w-8 text-honey" aria-hidden="true" />
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-honey">Ubicación</p>
          <h2 className="font-display text-5xl leading-none md:text-6xl">Ambato, Ecuador</h2>
          <p className="mt-6 text-base leading-8 text-white/74">
            Una marca boutique con identidad local y estética internacional: ideal para desayunar, brunchear, almorzar y llevar postres artesanales.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href={TARTELIER_MAPS_URL} target="_blank" rel="noreferrer">
              Abrir en Google Maps
            </PrimaryButton>
            <GhostButton href={TARTELIER_INSTAGRAM_URL} target="_blank" rel="noreferrer" light>
              Reservar por Instagram
            </GhostButton>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <SafeImage src={photos.latteCapas} alt="Bebida en capas Tartelier" loading="lazy" className="aspect-[4/5] rounded-lg object-cover shadow-lift" />
          <div className="rounded-lg border border-navy/10 bg-ivory p-8 shadow-lift">
            <Star className="h-7 w-7 text-honey" aria-hidden="true" />
            <p className="mt-6 font-display text-4xl leading-tight text-navy">Para una mañana lenta, un almuerzo bonito o ese postrecito que mejora el día.</p>
            <p className="mt-5 text-sm leading-7 text-ink/68">
              La web debe convertir con claridad: ver menú, visitar, reservar o pedir, siempre dejando que las fotos abran el apetito.
            </p>
          </div>
          <a
            href={TARTELIER_MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="group relative min-h-[320px] overflow-hidden rounded-lg bg-ivory p-8 shadow-lift ring-1 ring-navy/10 sm:col-span-2"
            aria-label="Abrir ubicación exacta de Tartelier en Google Maps"
          >
            <div className="absolute inset-0 opacity-70">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,30,58,0.08)_1px,transparent_1px),linear-gradient(rgba(15,30,58,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
              <div className="absolute left-[-10%] top-1/2 h-24 w-[120%] -translate-y-1/2 rotate-[-8deg] bg-honey/20" />
              <div className="absolute bottom-10 right-[-8%] h-20 w-[80%] rotate-[12deg] bg-rose/25" />
            </div>
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-honey">Mapa</p>
                <h3 className="max-w-xl font-display text-4xl leading-tight text-navy md:text-5xl">
                  Tartelier - Repostería Artesanal
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-7 text-ink/68">
                  Haz click para abrir la ubicación exacta en Google Maps.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy">
                  <MapPin className="h-4 w-4 text-honey" aria-hidden="true" />
                  {TARTELIER_COORDINATES}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-ivory transition group-hover:bg-ink">
                  Abrir mapa
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-navy px-5 py-20 text-white md:px-8 md:py-24">
      <SafeImage src={photos.bebidaFria} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-navy/82" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-honey">CTA</p>
        <h2 className="font-display text-5xl leading-tight text-balance md:text-7xl">Ven por café, quédate por el brunch y llévate un postre de autor.</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">
          Tartelier está listo para convertirse en una visita obligada en Ambato: visual, artesanal y con una carta que acompaña todo el día.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <PrimaryButton href="/carta">Ver menú</PrimaryButton>
          <GhostButton href={TARTELIER_INSTAGRAM_URL} target="_blank" rel="noreferrer" light>
            Reservar por Instagram
          </GhostButton>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ivory px-5 py-12 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 border-t border-navy/10 pt-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <SmartLink href="/" className="inline-flex items-center gap-3 text-navy">
            <Monogram />
            <span>
              <span className="block font-display text-3xl leading-none">tartelier</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.35em]">Repostería Artesanal</span>
            </span>
          </SmartLink>
          <p className="mt-5 max-w-md text-sm leading-7 text-ink/68">
            Repostería artesanal, cafetería, brunch y almuerzos selectos en Ambato, Ecuador.
          </p>
        </div>
        <div>
          <p className="font-semibold text-navy">Explorar</p>
          <div className="mt-4 grid gap-3">
            <SmartLink href="/" className="text-sm text-ink/66 hover:text-navy">
              Inicio
            </SmartLink>
            {navItems.map(([label, href]) => (
              <SmartLink key={label} href={href} className="text-sm text-ink/66 hover:text-navy">
                {label}
              </SmartLink>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold text-navy">Contacto</p>
          <div className="mt-4 grid gap-3 text-sm text-ink/66">
            <a
              href={TARTELIER_MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-navy"
            >
              <MapPin className="h-4 w-4 text-honey" aria-hidden="true" />
              Ambato, Ecuador
            </a>
            <a
              href={TARTELIER_INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-navy"
            >
              <Phone className="h-4 w-4 text-honey" aria-hidden="true" />
              Reservas por Instagram
            </a>
            <a
              href={TARTELIER_INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-navy"
            >
              <Instagram className="h-4 w-4 text-honey" aria-hidden="true" />
              @tartelier_ec
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-navy/10 pt-8">
        <div className="flex flex-col gap-4 text-xs leading-6 text-ink/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} <span className="font-semibold text-navy">Tartelier</span> · Repostería Artesanal.
            Todos los derechos reservados.
          </p>
          <p>
            Sitio web hecho con cariño por{' '}
            <a
              href={PITTAHAYA_URL}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-honey underline-offset-4 hover:underline"
            >
              Pittahaya
            </a>
            .
          </p>
        </div>
        <p className="mt-4 max-w-3xl text-[11px] leading-5 text-ink/45">
          La marca «Tartelier», su logotipo, así como los textos, fotografías, recetas, nombres de productos
          y el diseño de este sitio son propiedad de Tartelier y están protegidos por las leyes de propiedad
          intelectual y derechos de autor. Queda prohibida su reproducción, copia, distribución o uso, total o
          parcial, por cualquier medio, sin autorización previa y por escrito de Tartelier.
        </p>
      </div>
    </footer>
  );
}

function PageFrame({ children, showContact = false }) {
  return (
    <div className="pt-20">
      {children}
      {showContact ? <ContactSection /> : null}
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <BrandSection />
      <HomeHighlights />
      <ContactSection />
    </>
  );
}

function MenuPage() {
  return (
    <PageFrame>
      <FullMenuSection />
    </PageFrame>
  );
}

function DessertsPage() {
  return (
    <PageFrame>
      <DessertsSection />
    </PageFrame>
  );
}

function DrinksPage() {
  return (
    <PageFrame>
      <DrinksSection />
    </PageFrame>
  );
}

function BrunchPage() {
  return (
    <PageFrame>
      <BrunchSection />
    </PageFrame>
  );
}

function LunchPage() {
  return (
    <PageFrame>
      <LunchSection />
    </PageFrame>
  );
}

function ExperiencePage() {
  return (
    <PageFrame>
      <ExperienceSection />
      <GallerySection />
    </PageFrame>
  );
}

function LocationPage() {
  return (
    <PageFrame>
      <LocationSection />
    </PageFrame>
  );
}

function NotFoundPage() {
  return (
    <PageFrame>
      <section className="bg-ivory px-5 py-24 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-honey">404</p>
          <h1 className="font-display text-5xl leading-tight text-navy md:text-7xl">Esta página no está en la vitrina.</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70">
            Volvamos a una sección deliciosa y bien servida.
          </p>
          <div className="mt-8 flex justify-center">
            <PrimaryButton href="/" dark>
              Ir al inicio
            </PrimaryButton>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}

function CurrentPage({ currentPath }) {
  switch (currentPath) {
    case '/':
      return <HomePage />;
    case '/carta':
      return <MenuPage />;
    case '/postres':
      return <DessertsPage />;
    case '/bebidas':
      return <DrinksPage />;
    case '/brunch':
      return <BrunchPage />;
    case '/almuerzos':
      return <LunchPage />;
    case '/experiencia':
      return <ExperiencePage />;
    case '/ubicacion':
      return <LocationPage />;
    default:
      return <NotFoundPage />;
  }
}

export default function App() {
  const currentPath = usePathname();

  useEffect(() => {
    const meta = routeMeta[currentPath];
    document.title = currentPath === '/' || !meta ? 'Tartelier | Repostería Artesanal' : `${meta.eyebrow} | Tartelier`;
  }, [currentPath]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden font-sans">
      <Header currentPath={currentPath} />
      <main>
        <CurrentPage currentPath={currentPath} />
      </main>
      <Footer />
    </div>
  );
}
