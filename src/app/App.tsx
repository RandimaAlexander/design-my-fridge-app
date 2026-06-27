import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  Camera,
  Heart,
  ShoppingCart,
  User,
  Clock,
  Star,
  ChevronRight,
  ChevronLeft,
  Plus,
  Check,
  X,
  Search,
  Upload,
  Sparkles,
  Flame,
  Zap,
  Leaf,
  Share2,
  Download,
  Timer,
  ArrowLeft,
  UtensilsCrossed,
  Wifi,
  Battery,
  Signal,
  SlidersHorizontal,
  Bell,
  CheckCircle,
  Trash2,
  ChefHat,
  Award,
  TrendingUp,
  Minus,
} from "lucide-react";

// ─── Color tokens ─────────────────────────────────────────────────────────────
const C = {
  green: "#4CAF50",
  darkGreen: "#2E7D32",
  bg: "#FFFDF8",
  card: "#FFFFFF",
  orange: "#FFA726",
  text: "#212121",
  sub: "#757575",
  muted: "#BDBDBD",
  border: "rgba(0,0,0,0.07)",
  lightGreen: "#F1F8E9",
  midGreen: "#E8F5E9",
  chip: "#C8E6C9",
  red: "#EF5350",
  yellow: "#FFC107",
  purple: "#9C27B0",
};

// ─── Image map ────────────────────────────────────────────────────────────────
const IMG = {
  hero: "https://images.unsplash.com/photo-1690983322070-22861e13ce47?w=800&h=400&fit=crop&auto=format",
  pasta:
    "https://images.unsplash.com/photo-1713561058969-793049b01712?w=800&h=600&fit=crop&auto=format",
  salad:
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop&auto=format",
  stirfry:
    "https://images.unsplash.com/photo-1601226809816-b8c32440158a?w=800&h=600&fit=crop&auto=format",
  medSalad:
    "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=800&h=600&fit=crop&auto=format",
  soup: "https://images.unsplash.com/photo-1578861256505-d3be7cb037d3?w=800&h=600&fit=crop&auto=format",
  bowl: "https://images.unsplash.com/photo-1684403620650-81dc661a69db?w=800&h=600&fit=crop&auto=format",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const RECIPES = [
  {
    id: 1,
    title: "Creamy Tomato Pasta",
    image: IMG.pasta,
    rating: 4.9,
    time: "25 min",
    difficulty: "Easy",
    calories: 420,
    servings: 2,
    match: 100,
    missing: 0,
    missingItems: [],
    tags: ["Quick Meals", "Vegetarian"],
    popular: true,
    desc: "A silky, rich tomato pasta finished with fresh basil and aged parmesan.",
    ingredients: [
      "Pasta 200g",
      "Tomatoes 3 pcs",
      "Garlic 3 cloves",
      "Olive Oil 2 tbsp",
      "Fresh Basil",
      "Parmesan 50g",
    ],
    steps: [
      "Bring a large pot of generously salted water to a rolling boil. Cook pasta until al dente per package instructions.",
      "Heat olive oil in a wide skillet over medium. Add minced garlic, cook 60 seconds until fragrant—don't let it brown.",
      "Add crushed tomatoes. Season with salt, black pepper, and a pinch of chili flakes. Simmer uncovered 10 min.",
      "Reserve ½ cup starchy pasta water. Drain pasta and transfer to the sauce. Toss vigorously, adding pasta water to emulsify.",
      "Remove from heat. Tear in fresh basil, grate parmesan generously. Plate and serve immediately.",
    ],
  },
  {
    id: 2,
    title: "Rainbow Veggie Bowl",
    image: IMG.salad,
    rating: 4.7,
    time: "15 min",
    difficulty: "Easy",
    calories: 310,
    servings: 1,
    match: 88,
    missing: 1,
    missingItems: ["Avocado"],
    tags: ["Healthy", "Vegetarian"],
    popular: false,
    desc: "A vibrant, nutrient-packed bowl with seasonal vegetables and citrus dressing.",
    ingredients: [
      "Mixed Greens 100g",
      "Cherry Tomatoes 10 pcs",
      "Cucumber 1 pc",
      "Carrot 1 pc",
      "Avocado ½ pc",
      "Lemon Dressing 2 tbsp",
    ],
    steps: [
      "Wash all vegetables thoroughly. Spin-dry the greens to ensure the dressing clings well.",
      "Halve cherry tomatoes, slice cucumber into half-moons, and julienne the carrot finely.",
      "Layer greens in a wide, shallow bowl as your base. Arrange toppings in color blocks for the rainbow effect.",
      "Fan sliced avocado over one section. Add a soft-boiled egg if desired.",
      "Drizzle with lemon dressing. Season with flaky salt and cracked pepper. Serve at once.",
    ],
  },
  {
    id: 3,
    title: "Garlic Veggie Stir-Fry",
    image: IMG.stirfry,
    rating: 4.6,
    time: "20 min",
    difficulty: "Medium",
    calories: 380,
    servings: 2,
    match: 72,
    missing: 2,
    missingItems: ["Soy Sauce", "Sesame Oil"],
    tags: ["Quick Meals", "High Protein"],
    popular: true,
    desc: "Wok-charred vegetables in a glossy soy-ginger glaze. Ready in 20 minutes.",
    ingredients: [
      "Bell Peppers 2 pcs",
      "Broccoli 200g",
      "Garlic 4 cloves",
      "Soy Sauce 3 tbsp",
      "Sesame Oil 1 tbsp",
      "Fresh Ginger 1 tsp",
    ],
    steps: [
      "Prep everything before you heat the wok—this dish moves fast. Cut broccoli into small florets, slice peppers into thin strips.",
      "Heat wok over highest flame until smoking. Add sesame oil—it should shimmer instantly.",
      "Add garlic and ginger. Stir-fry 30 seconds, keeping them moving so they don't burn.",
      "Add broccoli. Toss on high heat 2 min. Add peppers, continue 2 more minutes until charred at edges.",
      "Pour soy sauce around the wok's edge so it sizzles. Toss everything to coat. Serve over steamed jasmine rice.",
    ],
  },
  {
    id: 4,
    title: "Mediterranean Chickpea Salad",
    image: IMG.medSalad,
    rating: 4.8,
    time: "10 min",
    difficulty: "Easy",
    calories: 280,
    servings: 2,
    match: 92,
    missing: 1,
    missingItems: ["Feta Cheese"],
    tags: ["Healthy", "Vegetarian", "Quick Meals"],
    popular: false,
    desc: "Sun-drenched flavors—olives, feta, and fresh herbs in every forkful.",
    ingredients: [
      "Chickpeas 400g",
      "Cucumber 1 pc",
      "Cherry Tomatoes 12 pcs",
      "Red Onion ½ pc",
      "Feta 80g",
      "Kalamata Olives 50g",
    ],
    steps: [
      "Drain and rinse chickpeas. Pat them dry with a paper towel for the best texture.",
      "Dice cucumber and tomatoes into similar-sized pieces. Thinly slice red onion; soak in cold water 5 min to mellow the bite.",
      "Combine chickpeas, cucumber, tomatoes, and drained onion in a large bowl.",
      "Add olives and crumbled feta. Drizzle with extra-virgin olive oil and fresh lemon juice.",
      "Season with dried oregano, salt, and pepper. Toss gently. Tastes even better after 15 minutes rest.",
    ],
  },
  {
    id: 5,
    title: "Tomato Lentil Soup",
    image: IMG.soup,
    rating: 4.5,
    time: "35 min",
    difficulty: "Easy",
    calories: 290,
    servings: 4,
    match: 80,
    missing: 1,
    missingItems: ["Red Lentils"],
    tags: ["Healthy", "Vegetarian"],
    popular: false,
    desc: "Hearty, warming soup with red lentils and fragrant cumin—perfect for any season.",
    ingredients: [
      "Red Lentils 200g",
      "Tomatoes 4 pcs",
      "Onion 1 pc",
      "Garlic 3 cloves",
      "Cumin 1 tsp",
      "Vegetable Stock 1L",
    ],
    steps: [
      "Sauté diced onion in olive oil over medium heat until soft and golden, about 8 minutes.",
      "Add garlic and cumin. Cook 1 minute until fragrant.",
      "Add rinsed lentils, crushed tomatoes, and stock. Bring to a boil.",
      "Reduce heat and simmer 25 minutes until lentils are completely tender.",
      "Use an immersion blender to partially blend for a creamy-chunky texture. Adjust seasoning and serve with crusty bread.",
    ],
  },
  {
    id: 6,
    title: "Acai Smoothie Bowl",
    image: IMG.bowl,
    rating: 4.9,
    time: "8 min",
    difficulty: "Easy",
    calories: 350,
    servings: 1,
    match: 95,
    missing: 0,
    missingItems: [],
    tags: ["Healthy", "Quick Meals"],
    popular: true,
    desc: "Thick, frozen acai base crowned with fresh fruit, granola, and honey.",
    ingredients: [
      "Frozen Acai 200g",
      "Banana 1 pc",
      "Mixed Berries 100g",
      "Granola 40g",
      "Honey 1 tbsp",
      "Coconut Flakes 20g",
    ],
    steps: [
      "Break frozen acai packet into chunks. Add to blender with half a frozen banana and a splash of almond milk.",
      "Blend on high until completely smooth and very thick—you want it spoonable, not drinkable.",
      "Pour into a chilled bowl immediately. The cold bowl keeps the base thick.",
      "Slice remaining banana. Arrange banana, berries, granola, and coconut in neat rows.",
      "Drizzle with honey. Eat immediately before the base melts.",
    ],
  },
];

const FRIDGE_INGREDIENTS = [
  { emoji: "🍅", name: "Tomatoes" },
  { emoji: "🧄", name: "Garlic" },
  { emoji: "🫑", name: "Bell Pepper" },
  { emoji: "🥦", name: "Broccoli" },
  { emoji: "🧅", name: "Onion" },
  { emoji: "🥕", name: "Carrot" },
  { emoji: "🍋", name: "Lemon" },
  { emoji: "🥚", name: "Eggs" },
  { emoji: "🧀", name: "Parmesan" },
  { emoji: "🫙", name: "Olive Oil" },
];

const SHOPPING_INIT = [
  { id: 1, name: "Avocado", qty: "2 pcs", checked: false, cat: "🥑 Produce" },
  { id: 2, name: "Feta Cheese", qty: "150g", checked: false, cat: "🧀 Dairy" },
  {
    id: 3,
    name: "Soy Sauce",
    qty: "1 bottle",
    checked: true,
    cat: "🫙 Pantry",
  },
  { id: 4, name: "Sesame Oil", qty: "100ml", checked: false, cat: "🫙 Pantry" },
  { id: 5, name: "Red Lentils", qty: "400g", checked: false, cat: "🌾 Grains" },
  {
    id: 6,
    name: "Kalamata Olives",
    qty: "1 jar",
    checked: true,
    cat: "🫙 Pantry",
  },
  { id: 7, name: "Almond Milk", qty: "500ml", checked: false, cat: "🥛 Dairy" },
];

// ─── Reusable atoms ───────────────────────────────────────────────────────────

function StatusBar({ light = false }: { light?: boolean }) {
  const col = light ? "text-white" : "text-[#212121]";
  return (
    <div
      className={`flex items-center justify-between px-5 pt-[14px] pb-1 ${col}`}
    >
      <span className="text-[13px] font-semibold tracking-tight">9:41</span>
      <div className="flex items-center gap-[5px]">
        <Signal size={13} strokeWidth={2.2} />
        <Wifi size={13} strokeWidth={2.2} />
        <Battery size={16} strokeWidth={2.2} />
      </div>
    </div>
  );
}

function MatchPill({ match, missing }: { match: number; missing: number }) {
  if (match === 100)
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#4CAF50] text-white px-2.5 py-[3px] rounded-full">
        ✦ 100% Match
      </span>
    );
  if (missing === 1)
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#FFA726] text-white px-2.5 py-[3px] rounded-full">
        Missing 1 Ingredient
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#EF5350] text-white px-2.5 py-[3px] rounded-full">
      Missing {missing} Ingredients
    </span>
  );
}

function PopularBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-white/90 text-[#FF7043] px-2 py-[3px] rounded-full">
      🔥 Popular
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-[3px]">
      <Star
        size={11}
        className="fill-[#FFC107] text-[#FFC107]"
        strokeWidth={0}
      />
      <span className="text-[12px] font-bold text-[#212121]">{rating}</span>
    </span>
  );
}

function Tag({ label }: { label: string }) {
  const map: Record<string, { bg: string; text: string; icon: JSX.Element }> = {
    Vegetarian: { bg: "#E8F5E9", text: "#2E7D32", icon: <Leaf size={9} /> },
    "Quick Meals": { bg: "#FFF8E1", text: "#F57F17", icon: <Zap size={9} /> },
    Healthy: { bg: "#E3F2FD", text: "#1565C0", icon: <Award size={9} /> },
    "High Protein": {
      bg: "#F3E5F5",
      text: "#6A1B9A",
      icon: <TrendingUp size={9} />,
    },
  };
  const s = map[label] ?? { bg: "#F5F5F5", text: "#616161", icon: null };
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-[3px] rounded-full"
      style={{ background: s.bg, color: s.text }}
    >
      {s.icon} {label}
    </span>
  );
}

// ─── Screen: Home ─────────────────────────────────────────────────────────────
function HomeScreen({
  onScan,
  onViewRecipe,
}: {
  onScan: () => void;
  onViewRecipe: (r: (typeof RECIPES)[0]) => void;
}) {
  const [liked, setLiked] = useState<number[]>([1, 6]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
      {/* Top bar */}
      <div className="px-5 pt-1 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-extrabold text-[#212121] tracking-tight leading-none">
            Good Morning, Alex👋
          </h1>
          <p className="text-[13px] text-[#757575] mt-1">
            What would you like to cook today?
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm border border-black/5 relative">
            <Bell size={16} className="text-[#212121]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF5350] rounded-full border border-white" />
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#4CAF50]">
            <img
              src="https://plus.unsplash.com/premium_photo-1738449258742-f98da1490e2d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Alex"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Hero card */}
      <div
        className="mx-5 mb-5 rounded-[24px] overflow-hidden relative"
        style={{ boxShadow: "0 8px 32px rgba(46,125,50,0.25)" }}
      >
        <img
          src={IMG.hero}
          alt="Fresh ingredients"
          className="w-full h-[168px] object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(27,94,32,0.82) 0%, rgba(56,142,60,0.55) 60%, rgba(27,94,32,0.20) 100%)",
          }}
        />
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#FFE082]" />
            <span className="text-[11px] font-bold text-[#FFE082] uppercase tracking-[0.08em]">
              Reduce food waste
            </span>
          </div>
          <div>
            <h2 className="text-[21px] font-extrabold text-white leading-snug mb-3 tracking-tight">
              Turn your fridge into
              <br />
              tonight's dinner
            </h2>
            <button
              onClick={onScan}
              className="flex items-center gap-2 bg-white text-[#2E7D32] text-[13px] font-extrabold px-5 py-2.5 rounded-full active:scale-95 transition-transform"
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}
            >
              <Camera size={14} strokeWidth={2.5} />
              Scan Ingredients
            </button>
          </div>
        </div>
      </div>

      {/* Fridge chips */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-bold text-[#212121]">
            In Your Fridge
          </h3>
          <button className="flex items-center gap-0.5 text-[12px] font-semibold text-[#4CAF50]">
            Edit <ChevronRight size={13} strokeWidth={2.5} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {FRIDGE_INGREDIENTS.map((i) => (
            <span
              key={i.name}
              className="text-[12px] font-medium px-3 py-[5px] rounded-full border"
              style={{
                background: C.lightGreen,
                color: C.darkGreen,
                borderColor: C.chip,
              }}
            >
              {i.emoji} {i.name}
            </span>
          ))}
          <button
            className="flex items-center gap-1 text-[12px] font-semibold px-3 py-[5px] rounded-full border border-dashed"
            style={{
              color: C.green,
              borderColor: C.green,
              background: "transparent",
            }}
          >
            <Plus size={11} strokeWidth={2.5} /> Add
          </button>
        </div>
      </div>

      {/* Quick stats row */}
      <div className="px-5 mb-5">
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { emoji: "🥗", val: "3 Meals", label: "Saved Today" },
            { emoji: "♻️", val: "460g", label: "Waste Reduced" },
            { emoji: "💸", val: "$14.20", label: "Money Saved" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-[16px] px-3 py-3 text-center border"
              style={{
                borderColor: C.border,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <div className="text-[20px] mb-0.5">{s.emoji}</div>
              <div className="text-[13px] font-extrabold text-[#212121]">
                {s.val}
              </div>
              <div className="text-[10px] text-[#757575] mt-0.5 leading-tight">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested recipes */}
      <div className="mb-1">
        <div className="flex items-center justify-between px-5 mb-3">
          <h3 className="text-[15px] font-bold text-[#212121]">
            Suggested for You
          </h3>
          <button className="flex items-center gap-0.5 text-[12px] font-semibold text-[#4CAF50]">
            See all <ChevronRight size={13} strokeWidth={2.5} />
          </button>
        </div>
        <div className="flex gap-3 px-5 overflow-x-auto pb-1 scrollbar-hide">
          {RECIPES.slice(0, 4).map((r) => (
            <button
              key={r.id}
              onClick={() => onViewRecipe(r)}
              className="flex-none w-[168px] bg-white rounded-[20px] overflow-hidden text-left active:scale-[0.97] transition-transform"
              style={{
                border: `1px solid ${C.border}`,
                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
              }}
            >
              <div className="relative">
                <img
                  src={r.image}
                  alt={r.title}
                  className="w-full h-[112px] object-cover bg-[#E8F5E9]"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLiked((p) =>
                      p.includes(r.id)
                        ? p.filter((x) => x !== r.id)
                        : [...p, r.id],
                    );
                  }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
                >
                  <Heart
                    size={13}
                    strokeWidth={2}
                    className={
                      liked.includes(r.id)
                        ? "fill-[#EF5350] text-[#EF5350]"
                        : "text-[#BDBDBD]"
                    }
                  />
                </button>
                <div className="absolute bottom-2 left-2">
                  <MatchPill match={r.match} missing={r.missing} />
                </div>
              </div>
              <div className="p-3">
                <p className="text-[12px] font-bold text-[#212121] leading-snug line-clamp-2 mb-2">
                  {r.title}
                </p>
                <div className="flex items-center justify-between">
                  <Stars rating={r.rating} />
                  <span className="flex items-center gap-0.5 text-[11px] text-[#757575]">
                    <Clock size={10} strokeWidth={2} /> {r.time}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Scan ─────────────────────────────────────────────────────────────
function ScanScreen({ onResults }: { onResults: () => void }) {
  const [detected, setDetected] = useState([
    "🍅 Tomatoes",
    "🧄 Garlic",
    "🥦 Broccoli",
    "🫑 Bell Pepper",
  ]);
  const [input, setInput] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger the 2.5s scan animation and then go to results
  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onResults();
    }, 2500);
  };

  const handleCapture = async () => {
    try {
      // Tries to open the device camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      simulateScan();
    } catch (err) {
      // If camera fails/denied, fallback to gallery
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      simulateScan();
    }
  };

  const addItem = () => {
    const v = input.trim();
    if (v) {
      setDetected((p) => [...p, `🥬 ${v}`]);
      setInput("");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <div className="px-5 pt-1 pb-4">
        <h1 className="text-[24px] font-extrabold text-[#212121] tracking-tight">
          Scan Ingredients
        </h1>
        <p className="text-[13px] text-[#757575] mt-0.5">
          Point camera at your fridge or pantry
        </p>
      </div>

      {/* Camera viewfinder / Loading State */}
      <div className="mx-5 mb-4">
        {isScanning ? (
          <div className="w-full h-[220px] rounded-[24px] flex flex-col items-center justify-center bg-white border border-[#E8F5E9] shadow-lg">
            <div className="w-10 h-10 border-4 border-[#4CAF50] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-[14px] font-bold text-[#2E7D32]">
              Scanning ingredients...
            </p>
          </div>
        ) : (
          <button
            onClick={handleCapture}
            className="w-full h-[220px] rounded-[24px] overflow-hidden relative flex items-center justify-center active:scale-[0.99] transition-transform"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
          >
            <img
              src={IMG.hero}
              alt="Camera preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Camera size={40} className="text-white" />
            </div>
          </button>
        )}
      </div>

      {/* Upload */}
      <div className="mx-5 mb-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[16px] border-2 border-dashed text-[13px] font-bold active:opacity-70 transition-opacity"
          style={{
            borderColor: C.green,
            color: C.green,
            background: C.lightGreen,
          }}
        >
          <Upload size={15} strokeWidth={2.5} /> Upload from Photo Library
        </button>
      </div>

      {/* Divider */}
      <div className="mx-5 flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-[#EEEEEE]" />
        <span className="text-[11px] font-extrabold text-[#BDBDBD] uppercase tracking-[0.12em]">
          or type manually
        </span>
        <div className="flex-1 h-px bg-[#EEEEEE]" />
      </div>

      {/* Manual input */}
      <div className="mx-5 mb-5 flex gap-2">
        <div
          className="flex-1 flex items-center gap-2.5 bg-white rounded-[14px] px-4 py-3 border"
          style={{
            borderColor: C.border,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Search size={15} className="text-[#BDBDBD]" strokeWidth={2} />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
            placeholder="e.g. spinach, chicken breast…"
            className="flex-1 text-[13px] text-[#212121] placeholder-[#BDBDBD] bg-transparent outline-none"
          />
        </div>
        <button
          onClick={addItem}
          className="w-12 h-12 rounded-[14px] flex items-center justify-center active:scale-95 transition-transform"
          style={{
            background: C.green,
            boxShadow: "0 4px 12px rgba(76,175,80,0.4)",
          }}
        >
          <Plus size={22} className="text-white" strokeWidth={2.5} />
        </button>
      </div>

      {/* Detected chips */}
      {detected.length > 0 && (
        <div className="mx-5 mb-6">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#BDBDBD] mb-2.5">
            Detected · {detected.length} ingredients
          </p>
          <div className="flex flex-wrap gap-2">
            {detected.map((d) => (
              <span
                key={d}
                className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-[6px] rounded-full border"
                style={{
                  background: C.lightGreen,
                  color: C.darkGreen,
                  borderColor: C.chip,
                }}
              >
                {d}
                <button
                  onClick={() => setDetected((p) => p.filter((x) => x !== d))}
                  className="text-[#81C784] active:text-[#EF5350] transition-colors"
                >
                  <X size={11} strokeWidth={2.5} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mx-5">
        <button
          onClick={onResults}
          className="w-full flex items-center justify-center gap-2.5 text-white font-extrabold text-[15px] py-4 rounded-[18px] active:scale-[0.98] transition-transform"
          style={{
            background: "linear-gradient(135deg, #2E7D32, #4CAF50)",
            boxShadow: "0 8px 24px rgba(76,175,80,0.4)",
          }}
        >
          <Sparkles size={18} strokeWidth={2} />
          Find Recipes · {detected.length} ingredients
        </button>
      </div>
    </div>
  );
}

// ─── Screen: Recipe Results ───────────────────────────────────────────────────
function ResultsScreen({
  onBack,
  onViewRecipe,
}: {
  onBack: () => void;
  onViewRecipe: (r: (typeof RECIPES)[0]) => void;
}) {
  const ALL_FILTERS = [
    "All",
    "Vegetarian",
    "Quick Meals",
    "Healthy",
    "High Protein",
  ];
  const [activeFilters, setActiveFilters] = useState<string[]>(["All"]);
  const [liked, setLiked] = useState<number[]>([1, 6]);

  const toggle = (f: string) => {
    if (f === "All") {
      setActiveFilters(["All"]);
      return;
    }
    const next = activeFilters.filter((x) => x !== "All");
    const updated = next.includes(f)
      ? next.filter((x) => x !== f)
      : [...next, f];
    setActiveFilters(updated.length ? updated : ["All"]);
  };

  const visible = activeFilters.includes("All")
    ? RECIPES
    : RECIPES.filter((r) => r.tags.some((t) => activeFilters.includes(t)));

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
      {/* Header */}
      <div className="px-5 pt-1 pb-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white border flex items-center justify-center"
          style={{
            borderColor: C.border,
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          }}
        >
          <ArrowLeft size={17} strokeWidth={2.5} className="text-[#212121]" />
        </button>
        <div className="flex-1">
          <h1 className="text-[20px] font-extrabold text-[#212121] tracking-tight">
            Recipe Results
          </h1>
          <p className="text-[12px] text-[#757575]">
            {visible.length} recipes matched your fridge
          </p>
        </div>
        <button
          className="w-9 h-9 rounded-full bg-white border flex items-center justify-center"
          style={{
            borderColor: C.border,
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          }}
        >
          <SlidersHorizontal
            size={15}
            strokeWidth={2.2}
            className="text-[#757575]"
          />
        </button>
      </div>

      {/* Filter chips */}
      <div className="px-5 mb-4 flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
        {ALL_FILTERS.map((f) => {
          const on = activeFilters.includes(f);
          return (
            <button
              key={f}
              onClick={() => toggle(f)}
              className="flex-none text-[12px] font-bold px-4 py-[7px] rounded-full transition-all active:scale-95"
              style={
                on
                  ? {
                      background: C.green,
                      color: "#fff",
                      boxShadow: "0 3px 10px rgba(76,175,80,0.35)",
                    }
                  : {
                      background: "#fff",
                      color: C.sub,
                      border: `1px solid ${C.border}`,
                    }
              }
            >
              {f === "Vegetarian" && "🌿 "}
              {f === "Quick Meals" && "⚡ "}
              {f === "Healthy" && "💚 "}
              {f === "High Protein" && "💪 "}
              {f}
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <div className="px-5 flex flex-col gap-4">
        {visible.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-[22px] overflow-hidden active:scale-[0.99] transition-transform cursor-pointer"
            style={{
              border: `1px solid ${C.border}`,
              boxShadow: "0 3px 16px rgba(0,0,0,0.08)",
            }}
            onClick={() => onViewRecipe(r)}
          >
            {/* Image */}
            <div className="relative">
              <img
                src={r.image}
                alt={r.title}
                className="w-full h-[175px] object-cover bg-[#E8F5E9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLiked((p) =>
                    p.includes(r.id)
                      ? p.filter((x) => x !== r.id)
                      : [...p, r.id],
                  );
                }}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md"
              >
                <Heart
                  size={16}
                  strokeWidth={2}
                  className={
                    liked.includes(r.id)
                      ? "fill-[#EF5350] text-[#EF5350]"
                      : "text-[#BDBDBD]"
                  }
                />
              </button>
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <MatchPill match={r.match} missing={r.missing} />
                {r.popular && <PopularBadge />}
              </div>
              <div className="absolute bottom-3 left-3 flex gap-1.5">
                {r.tags.slice(0, 2).map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>
            </div>
            {/* Body */}
            <div className="p-4">
              <h3 className="text-[16px] font-extrabold text-[#212121] tracking-tight mb-1">
                {r.title}
              </h3>
              <p className="text-[12px] text-[#757575] leading-relaxed mb-3 line-clamp-2">
                {r.desc}
              </p>
              <div className="flex items-center gap-3 mb-3">
                <Stars rating={r.rating} />
                <span className="flex items-center gap-1 text-[12px] text-[#757575]">
                  <Clock size={12} strokeWidth={2} className="text-[#4CAF50]" />
                  {r.time}
                </span>
                <span className="flex items-center gap-1 text-[12px] text-[#757575]">
                  <Flame size={12} strokeWidth={2} className="text-[#FFA726]" />
                  {r.difficulty}
                </span>
                <span className="flex items-center gap-1 text-[12px] text-[#757575]">
                  <Zap size={12} strokeWidth={2} className="text-[#9C27B0]" />
                  {r.calories} cal
                </span>
              </div>
              {r.missingItems.length > 0 && (
                <div className="flex items-center gap-2 bg-[#FFF8E1] rounded-[10px] px-3 py-2 mb-3">
                  <ShoppingCart
                    size={12}
                    className="text-[#FFA726] flex-none"
                    strokeWidth={2.5}
                  />
                  <p className="text-[11px] text-[#E65100] font-semibold">
                    Need to buy: {r.missingItems.join(", ")}
                  </p>
                </div>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewRecipe(r);
                }}
                className="w-full text-white font-extrabold text-[14px] py-3 rounded-[13px] flex items-center justify-center gap-2 active:opacity-85 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, #2E7D32, #4CAF50)",
                  boxShadow: "0 4px 14px rgba(76,175,80,0.35)",
                }}
              >
                <UtensilsCrossed size={15} strokeWidth={2.5} /> View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Screen: Cooking ──────────────────────────────────────────────────────────
function CookingScreen({
  recipe,
  onBack,
}: {
  recipe: (typeof RECIPES)[0];
  onBack: () => void;
}) {
  const [tab, setTab] = useState<"ingredients" | "steps">("ingredients");
  const [checkedIng, setCheckedIng] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [timerOn, setTimerOn] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerOn) {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerOn]);

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const progress = done.length / recipe.steps.length;
  const allDone = done.length === recipe.steps.length;

  const markComplete = () => {
    if (!done.includes(step)) setDone((p) => [...p, step]);
    if (step < recipe.steps.length - 1) setStep((p) => p + 1);
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide pb-28 relative">
      {/* Hero */}
      <div className="relative h-[230px]">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover bg-[#E8F5E9]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md"
        >
          <ArrowLeft size={17} strokeWidth={2.5} className="text-[#212121]" />
        </button>
        <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
          <Heart
            size={15}
            strokeWidth={2}
            className="fill-[#EF5350] text-[#EF5350]"
          />
        </button>
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          <h2 className="text-[20px] font-extrabold text-white tracking-tight leading-snug">
            {recipe.title}
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-white/85 text-[12px]">
              <Clock size={11} /> {recipe.time}
            </span>
            <span className="flex items-center gap-1 text-white/85 text-[12px]">
              <Flame size={11} /> {recipe.difficulty}
            </span>
            <span className="flex items-center gap-1 text-white/85 text-[12px]">
              <Stars rating={recipe.rating} />
            </span>
            <span className="flex items-center gap-1 text-white/85 text-[12px]">
              👥 {recipe.servings} servings
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mx-5 mt-4 mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#BDBDBD]">
            Cook Progress
          </span>
          <span className="text-[12px] font-bold" style={{ color: C.green }}>
            {Math.round(progress * 100)}% done
          </span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ background: "#E0E0E0" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${progress * 100}%`,
              background: "linear-gradient(90deg, #2E7D32, #66BB6A)",
            }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-5 mb-4 bg-[#F5F5F0] p-1 rounded-[14px] flex gap-1">
        {(["ingredients", "steps"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-[9px] rounded-[11px] text-[12px] font-bold transition-all capitalize ${tab === t ? "bg-white text-[#212121] shadow-sm" : "text-[#757575]"}`}
          >
            {t === "ingredients"
              ? `🥦 Ingredients (${recipe.ingredients.length})`
              : `📋 Steps (${recipe.steps.length})`}
          </button>
        ))}
      </div>

      {tab === "ingredients" ? (
        <div className="mx-5">
          <div
            className="bg-white rounded-[20px] overflow-hidden"
            style={{
              border: `1px solid ${C.border}`,
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            }}
          >
            {recipe.ingredients.map((ing, i) => (
              <button
                key={i}
                onClick={() =>
                  setCheckedIng((p) =>
                    p.includes(i) ? p.filter((x) => x !== i) : [...p, i],
                  )
                }
                className={`w-full flex items-center gap-3 px-4 py-4 text-left transition-colors ${i < recipe.ingredients.length - 1 ? "border-b" : ""} ${checkedIng.includes(i) ? "bg-[#F9FBF9]" : "bg-white"}`}
                style={{ borderColor: "#F5F5F0" }}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-none transition-all ${checkedIng.includes(i) ? "bg-[#4CAF50]" : "border-2 border-[#E0E0E0]"}`}
                >
                  {checkedIng.includes(i) && (
                    <Check size={12} className="text-white" strokeWidth={3} />
                  )}
                </div>
                <span
                  className={`text-[14px] flex-1 ${checkedIng.includes(i) ? "text-[#BDBDBD] line-through" : "text-[#212121] font-medium"}`}
                >
                  {ing}
                </span>
              </button>
            ))}
          </div>
          <div
            className="mt-3 rounded-[12px] px-4 py-3 text-center"
            style={{ background: C.midGreen }}
          >
            <p
              className="text-[12px] font-semibold"
              style={{ color: C.darkGreen }}
            >
              {checkedIng.length}/{recipe.ingredients.length} ingredients ready
            </p>
          </div>
        </div>
      ) : (
        <div className="mx-5">
          {/* Step dots */}
          <div className="flex justify-center gap-1.5 mb-4">
            {recipe.steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`rounded-full transition-all ${i === step ? "w-7 h-2.5 bg-[#4CAF50]" : done.includes(i) ? "w-2.5 h-2.5 bg-[#A5D6A7]" : "w-2.5 h-2.5 bg-[#E0E0E0]"}`}
              />
            ))}
          </div>

          {/* Active step */}
          <div
            className="bg-white rounded-[20px] p-5 mb-4"
            style={{
              border: `1px solid ${C.border}`,
              boxShadow: "0 3px 16px rgba(0,0,0,0.08)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-none"
                style={{
                  background: "linear-gradient(135deg, #2E7D32, #4CAF50)",
                }}
              >
                <span className="text-[15px] font-extrabold text-white">
                  {step + 1}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#BDBDBD]">
                  Step {step + 1} of {recipe.steps.length}
                </p>
                <p
                  className="text-[12px] font-bold"
                  style={{ color: done.includes(step) ? C.green : C.orange }}
                >
                  {done.includes(step) ? "✓ Completed" : "In Progress"}
                </p>
              </div>
            </div>
            <p className="text-[14px] text-[#212121] leading-[1.65]">
              {recipe.steps[step]}
            </p>
          </div>

          {/* Nav buttons */}
          <div className="flex gap-2.5 mb-3">
            <button
              onClick={() => setStep((p) => Math.max(0, p - 1))}
              disabled={step === 0}
              className="w-12 h-12 rounded-[14px] flex items-center justify-center bg-white border disabled:opacity-30 active:bg-[#F5F5F0] transition-colors"
              style={{
                borderColor: C.border,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <ChevronLeft
                size={20}
                strokeWidth={2.5}
                className="text-[#212121]"
              />
            </button>
            <button
              onClick={markComplete}
              className="flex-1 flex items-center justify-center gap-2 text-white font-extrabold text-[14px] py-3 rounded-[14px] active:opacity-85 transition-opacity"
              style={{
                background: "linear-gradient(135deg, #2E7D32, #4CAF50)",
                boxShadow: "0 4px 16px rgba(76,175,80,0.4)",
              }}
            >
              {done.includes(step) ? (
                <>
                  <ChevronRight size={16} strokeWidth={2.5} /> Next Step
                </>
              ) : (
                <>
                  <Check size={16} strokeWidth={2.5} /> Mark Step Complete
                </>
              )}
            </button>
          </div>

          {allDone && (
            <div
              className="rounded-[18px] px-5 py-5 text-center border-2"
              style={{ background: C.midGreen, borderColor: C.chip }}
            >
              <div className="text-[32px] mb-1">🎉</div>
              <p
                className="text-[16px] font-extrabold"
                style={{ color: C.darkGreen }}
              >
                Recipe Complete!
              </p>
              <p className="text-[12px] mt-1" style={{ color: C.green }}>
                Enjoy your {recipe.title}, Alex!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Floating timer */}
      <div className="fixed bottom-28 right-5 flex flex-col items-end gap-2 z-30">
        {timerOn && (
          <div className="bg-[#2E7D32] text-white text-[13px] font-extrabold px-3 py-1.5 rounded-full shadow-lg font-mono">
            {fmt(seconds)}
          </div>
        )}
        <button
          onClick={() => {
            setTimerOn((p) => !p);
            if (timerOn) setSeconds(0);
          }}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-transform"
          style={{
            background: timerOn ? C.orange : C.darkGreen,
            boxShadow: timerOn
              ? "0 6px 20px rgba(255,167,38,0.5)"
              : "0 6px 20px rgba(46,125,50,0.45)",
          }}
        >
          <Timer size={22} className="text-white" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

// ─── Screen: Favorites ────────────────────────────────────────────────────────
function FavoritesScreen({
  onViewRecipe,
}: {
  onViewRecipe: (r: (typeof RECIPES)[0]) => void;
}) {
  const favs = RECIPES.filter((r) => [1, 4, 6].includes(r.id));
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
      <div className="px-5 pt-1 pb-4">
        <h1 className="text-[24px] font-extrabold text-[#212121] tracking-tight">
          Favorites
        </h1>
        <p className="text-[13px] text-[#757575] mt-0.5">
          {favs.length} saved recipes
        </p>
      </div>
      <div className="px-5 flex flex-col gap-4">
        {favs.map((r) => (
          <button
            key={r.id}
            onClick={() => onViewRecipe(r)}
            className="w-full flex items-center gap-4 bg-white rounded-[18px] overflow-hidden p-3 active:scale-[0.98] transition-transform text-left"
            style={{
              border: `1px solid ${C.border}`,
              boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
            }}
          >
            <img
              src={r.image}
              alt={r.title}
              className="w-[80px] h-[80px] rounded-[14px] object-cover bg-[#E8F5E9] flex-none"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <MatchPill match={r.match} missing={r.missing} />
              </div>
              <p className="text-[14px] font-extrabold text-[#212121] leading-snug mb-1 truncate">
                {r.title}
              </p>
              <div className="flex items-center gap-2.5">
                <Stars rating={r.rating} />
                <span className="flex items-center gap-0.5 text-[11px] text-[#757575]">
                  <Clock size={10} /> {r.time}
                </span>
                <span className="flex items-center gap-0.5 text-[11px] text-[#757575]">
                  <Zap size={10} /> {r.calories} cal
                </span>
              </div>
            </div>
            <Heart
              size={18}
              strokeWidth={0}
              className="fill-[#EF5350] text-[#EF5350] flex-none"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Screen: Shopping List ────────────────────────────────────────────────────
function ShoppingScreen() {
  const [items, setItems] = useState(SHOPPING_INIT);
  const [newName, setNewName] = useState("");

  const toggle = (id: number) =>
    setItems((p) =>
      p.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)),
    );
  const remove = (id: number) => setItems((p) => p.filter((i) => i.id !== id));
  const add = () => {
    if (newName.trim()) {
      setItems((p) => [
        ...p,
        {
          id: Date.now(),
          name: newName.trim(),
          qty: "1 pc",
          checked: false,
          cat: "🛒 Other",
        },
      ]);
      setNewName("");
    }
  };

  const unchecked = items.filter((i) => !i.checked);
  const checked = items.filter((i) => i.checked);
  const pct = items.length
    ? Math.round((checked.length / items.length) * 100)
    : 0;

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
      <div className="px-5 pt-1 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-extrabold text-[#212121] tracking-tight">
            Shopping List
          </h1>
          <p className="text-[13px] text-[#757575] mt-0.5">
            {unchecked.length} items to buy
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="w-9 h-9 rounded-[10px] bg-white border flex items-center justify-center shadow-sm"
            style={{ borderColor: C.border }}
          >
            <Share2 size={15} strokeWidth={2} className="text-[#757575]" />
          </button>
          <button
            className="w-9 h-9 rounded-[10px] bg-white border flex items-center justify-center shadow-sm"
            style={{ borderColor: C.border }}
          >
            <Download size={15} strokeWidth={2} className="text-[#757575]" />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div
        className="mx-5 mb-4 bg-white rounded-[18px] p-4"
        style={{
          border: `1px solid ${C.border}`,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] font-bold text-[#212121]">
            Purchase Progress
          </span>
          <span
            className="text-[13px] font-extrabold"
            style={{ color: C.green }}
          >
            {pct}%
          </span>
        </div>
        <div
          className="h-2.5 rounded-full overflow-hidden"
          style={{ background: "#F0F0F0" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(90deg, #2E7D32, #66BB6A)",
            }}
          />
        </div>
        <p className="text-[11px] text-[#757575] mt-2">
          {checked.length} of {items.length} items purchased
        </p>
      </div>

      {/* Add item */}
      <div className="mx-5 mb-4 flex gap-2">
        <div
          className="flex-1 flex items-center gap-2 bg-white rounded-[14px] px-4 py-3 border"
          style={{
            borderColor: C.border,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Plus size={14} className="text-[#BDBDBD]" strokeWidth={2.5} />
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Add item to list…"
            className="flex-1 text-[13px] text-[#212121] placeholder-[#BDBDBD] bg-transparent outline-none"
          />
        </div>
        <button
          onClick={add}
          className="w-12 h-12 rounded-[14px] flex items-center justify-center active:scale-95 transition-transform"
          style={{
            background: C.green,
            boxShadow: "0 4px 12px rgba(76,175,80,0.4)",
          }}
        >
          <Plus size={22} className="text-white" strokeWidth={2.5} />
        </button>
      </div>

      {/* To buy */}
      {unchecked.length > 0 && (
        <div className="px-5 mb-4">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#BDBDBD] px-1 mb-2.5">
            To Buy · {unchecked.length}
          </p>
          <div
            className="bg-white rounded-[20px] overflow-hidden"
            style={{
              border: `1px solid ${C.border}`,
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            }}
          >
            {unchecked.map((item, idx) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 px-4 py-3.5 ${idx < unchecked.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: "#F5F5F0" }}
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="w-6 h-6 rounded-full border-2 flex-none"
                  style={{ borderColor: C.green }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#212121]">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-[#BDBDBD]">{item.cat}</p>
                </div>
                <span
                  className="text-[11px] font-bold px-2.5 py-1 rounded-full flex-none"
                  style={{ background: "#F5F5F0", color: C.sub }}
                >
                  {item.qty}
                </span>
                <button
                  onClick={() => remove(item.id)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#DDDDDD] active:text-[#EF5350] active:bg-[#FFEBEE] transition-colors"
                >
                  <X size={14} strokeWidth={2.5} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Purchased */}
      {checked.length > 0 && (
        <div className="px-5 mb-4">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#BDBDBD] px-1 mb-2.5">
            Purchased · {checked.length}
          </p>
          <div
            className="bg-white rounded-[20px] overflow-hidden opacity-55"
            style={{ border: `1px solid ${C.border}` }}
          >
            {checked.map((item, idx) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 px-4 py-3.5 ${idx < checked.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: "#F5F5F0" }}
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-none"
                  style={{ background: C.green }}
                >
                  <Check size={12} className="text-white" strokeWidth={3} />
                </button>
                <p className="flex-1 text-[14px] text-[#BDBDBD] line-through">
                  {item.name}
                </p>
                <span
                  className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "#F5F5F0", color: "#BDBDBD" }}
                >
                  {item.qty}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setItems((p) => p.filter((i) => !i.checked))}
            className="mt-3 w-full py-3 rounded-[14px] text-[12px] font-bold border-2 border-dashed active:opacity-70 transition-opacity text-center"
            style={{ borderColor: "#FFCDD2", color: "#EF9A9A" }}
          >
            Clear {checked.length} purchased items
          </button>
        </div>
      )}
    </div>
  );
}

function ProfileScreen() {
  const [settings, setSettings] = useState({
    diet: "Vegetarian-friendly",
    allergens: ["Nuts", "Shellfish"],
    household: "2 people",
    notifications: "Enabled",
    language: "English",
  });

  const [currentView, setCurrentView] = useState<
    "profile" | "cookbook" | "add" | "paste" | "cooking"
  >("profile");
  const [sheetContent, setSheetContent] = useState<null | string>(null);

  const [customAllergen, setCustomAllergen] = useState("");
  const [customHousehold, setCustomHousehold] = useState("");
  const [editingRecipeId, setEditingRecipeId] = useState<number | null>(null);
  const [profilePic, setProfilePic] = useState(
    "https://plus.unsplash.com/premium_photo-1738449258742-f98da1490e2d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  );

  const [myRecipes, setMyRecipes] = useState([
    {
      id: 999,
      title: "My Family Lasagna",
      image:
        "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop&auto=format",
      rating: 5.0,
      time: "90 min",
      difficulty: "Medium",
      calories: 650,
      servings: 6,
      match: 100,
      missing: 0,
      missingItems: [],
      tags: ["Family", "Dinner"],
      popular: false,
      desc: "Passed down for generations. The secret is in the sauce.",
      ingredients: [
        "Lasagna noodles 1 box",
        "Ground beef 500g",
        "Tomato sauce 2 jars",
        "Ricotta 400g",
        "Mozzarella 200g",
      ],
      steps: [
        "Boil noodles until al dente.",
        "Brown meat in a large skillet.",
        "Mix ricotta with herbs.",
        "Layer noodles, meat sauce, and cheeses.",
        "Bake at 375°F for 45 mins until bubbly.",
      ],
      notes: "Kids prefer extra cheese. Use fresh basil on top.",
    },
  ]);

  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  const [newRecipe, setNewRecipe] = useState({
    title: "",
    desc: "",
    time: "",
    difficulty: "Easy",
    ingredients: [""],
    steps: [""],
    notes: "",
  });
  const [pasteText, setPasteText] = useState("");

  const stats = [
    { val: "48", label: "Recipes Made" },
    { val: "2.3kg", label: "Waste Saved" },
    { val: "$86", label: "Money Saved" },
  ];

  const closeSheet = () => {
    setSheetContent(null);
    setCustomAllergen("");
    setCustomHousehold("");
  };

  const updateSetting = (key: string, val: any) =>
    setSettings((prev) => ({ ...prev, [key]: val }));

  const toggleAllergen = (a: string) => {
    setSettings((prev) => {
      const current = prev.allergens;
      return current.includes(a)
        ? { ...prev, allergens: current.filter((x) => x !== a) }
        : { ...prev, allergens: [...current, a] };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSaveRecipe = () => {
    const safeIngredients = newRecipe.ingredients.filter(
      (i) => i.trim() !== "",
    );
    const safeSteps = newRecipe.steps.filter((s) => s.trim() !== "");

    if (editingRecipeId) {
      setMyRecipes((prev) =>
        prev.map((r) => {
          if (r.id === editingRecipeId) {
            return {
              ...r,
              title: newRecipe.title || "Untitled Recipe",
              time: newRecipe.time || "30 min",
              difficulty: newRecipe.difficulty,
              desc: newRecipe.desc || "A custom recipe.",
              ingredients: safeIngredients.length
                ? safeIngredients
                : ["No ingredients listed"],
              steps: safeSteps.length ? safeSteps : ["No steps listed"],
              notes: newRecipe.notes,
            };
          }
          return r;
        }),
      );
    } else {
      const recipeToSave = {
        id: Date.now(),
        title: newRecipe.title || "Untitled Recipe",
        image:
          "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=600&fit=crop&auto=format",
        rating: 0,
        time: newRecipe.time || "30 min",
        difficulty: newRecipe.difficulty,
        calories: 0,
        servings: 2,
        match: 100,
        missing: 0,
        missingItems: [],
        tags: ["Custom"],
        popular: false,
        desc: newRecipe.desc || "A custom recipe.",
        ingredients: safeIngredients.length
          ? safeIngredients
          : ["No ingredients listed"],
        steps: safeSteps.length ? safeSteps : ["No steps listed"],
        notes: newRecipe.notes,
      };
      setMyRecipes([recipeToSave, ...myRecipes]);
    }

    setEditingRecipeId(null);
    setCurrentView("cookbook");
    setNewRecipe({
      title: "",
      desc: "",
      time: "",
      difficulty: "Easy",
      ingredients: [""],
      steps: [""],
      notes: "",
    });
  };

  const handleSavePasted = () => {
    const recipeToSave = {
      id: Date.now(),
      title: "Pasted Recipe",
      image:
        "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=600&fit=crop&auto=format",
      rating: 0,
      time: "-- min",
      difficulty: "Medium",
      calories: 0,
      servings: 2,
      match: 100,
      missing: 0,
      missingItems: [],
      tags: ["Pasted"],
      popular: false,
      desc: "Imported from text.",
      ingredients: ["See steps for ingredients"],
      steps: pasteText.split("\n").filter((s) => s.trim() !== ""),
      notes: "",
    };
    if (recipeToSave.steps.length === 0)
      recipeToSave.steps = ["No details provided"];

    setMyRecipes([recipeToSave, ...myRecipes]);
    setCurrentView("cookbook");
    setPasteText("");
  };

  const renderSheetContent = () => {
    switch (sheetContent) {
      case "Dietary Preferences":
        return (
          <div className="flex flex-col gap-2">
            {["No Preference", "Vegetarian", "Vegan", "Keto", "Halal"].map(
              (opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    updateSetting("diet", opt);
                    closeSheet();
                  }}
                  className={`py-3.5 px-4 rounded-[16px] text-left text-[14px] font-bold transition-all ${settings.diet === opt ? "bg-[#4CAF50] text-white shadow-md" : "bg-[#F9FBF9] border border-[#E0E0E0] text-[#212121]"}`}
                >
                  {opt}
                </button>
              ),
            )}
          </div>
        );
      case "Allergens":
        const standardAllergens = [
          "Nuts",
          "Dairy",
          "Eggs",
          "Seafood",
          "Soy",
          "Gluten",
        ];
        const allAllergens = Array.from(
          new Set([...standardAllergens, ...settings.allergens]),
        );
        return (
          <div className="flex flex-col gap-2">
            <p className="text-[12px] text-[#757575] mb-1 font-medium px-1">
              Select all that apply or add your own:
            </p>
            {allAllergens.map((opt) => {
              const selected = settings.allergens.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => toggleAllergen(opt)}
                  className={`py-3.5 px-4 rounded-[16px] text-left text-[14px] font-bold flex justify-between items-center transition-all ${selected ? "bg-[#E8F5E9] text-[#2E7D32] border border-[#4CAF50]" : "bg-[#F9FBF9] border border-[#E0E0E0] text-[#212121]"}`}
                >
                  {opt}
                  {selected && <Check size={16} strokeWidth={3} />}
                </button>
              );
            })}

            <div className="flex items-center gap-2 mt-2">
              <input
                value={customAllergen}
                onChange={(e) => setCustomAllergen(e.target.value)}
                placeholder="Type other allergen..."
                className="flex-1 bg-[#F9FBF9] border border-[#E0E0E0] rounded-[16px] px-4 py-3.5 text-[14px] font-bold text-[#212121] outline-none"
              />
              <button
                onClick={() => {
                  if (
                    customAllergen.trim() &&
                    !settings.allergens.includes(customAllergen.trim())
                  ) {
                    toggleAllergen(customAllergen.trim());
                    setCustomAllergen("");
                  }
                }}
                className="h-[50px] w-[50px] bg-[#4CAF50] text-white rounded-[16px] flex items-center justify-center font-bold active:scale-95 transition-transform"
              >
                <Plus size={20} strokeWidth={2.5} />
              </button>
            </div>

            <button
              onClick={closeSheet}
              className="mt-4 py-3.5 bg-[#4CAF50] text-white font-extrabold rounded-[16px] shadow-md active:scale-95 transition-transform"
            >
              Done
            </button>
          </div>
        );
      case "Household Size":
        return (
          <div className="flex flex-col gap-2">
            {["1 Person", "2 People", "3 People", "4 People"].map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  updateSetting("household", opt);
                  closeSheet();
                }}
                className={`py-3.5 px-4 rounded-[16px] text-left text-[14px] font-bold transition-all ${settings.household === opt ? "bg-[#4CAF50] text-white shadow-md" : "bg-[#F9FBF9] border border-[#E0E0E0] text-[#212121]"}`}
              >
                {opt}
              </button>
            ))}

            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                value={customHousehold}
                onChange={(e) => setCustomHousehold(e.target.value)}
                placeholder="Exact number..."
                className="flex-1 bg-[#F9FBF9] border border-[#E0E0E0] rounded-[16px] px-4 py-3.5 text-[14px] font-bold text-[#212121] outline-none"
              />
              <button
                onClick={() => {
                  if (customHousehold.trim()) {
                    updateSetting(
                      "household",
                      `${customHousehold.trim()} People`,
                    );
                    closeSheet();
                  }
                }}
                className="px-6 h-[50px] bg-[#4CAF50] text-white rounded-[16px] flex items-center justify-center font-extrabold text-[14px] active:scale-95 transition-transform"
              >
                Save
              </button>
            </div>
          </div>
        );
      case "Notifications":
        return (
          <div className="flex flex-col gap-2">
            {["ON", "OFF"].map((opt) => {
              const enabled =
                settings.notifications ===
                (opt === "ON" ? "Enabled" : "Disabled");
              return (
                <button
                  key={opt}
                  onClick={() => {
                    updateSetting(
                      "notifications",
                      opt === "ON" ? "Enabled" : "Disabled",
                    );
                    closeSheet();
                  }}
                  className={`py-3.5 px-4 rounded-[16px] text-left text-[14px] font-bold transition-all ${enabled ? "bg-[#4CAF50] text-white shadow-md" : "bg-[#F9FBF9] border border-[#E0E0E0] text-[#212121]"}`}
                >
                  {opt === "ON" ? "Enabled (Push & Email)" : "Disabled (None)"}
                </button>
              );
            })}
          </div>
        );
      case "Language":
        return (
          <div className="flex flex-col gap-2">
            {["English", "Sinhala", "Tamil"].map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  updateSetting("language", opt);
                  closeSheet();
                }}
                className={`py-3.5 px-4 rounded-[16px] text-left text-[14px] font-bold transition-all ${settings.language === opt ? "bg-[#4CAF50] text-white shadow-md" : "bg-[#F9FBF9] border border-[#E0E0E0] text-[#212121]"}`}
              >
                {opt}
              </button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  if (currentView === "cooking" && selectedRecipe) {
    return (
      <div className="flex-1 flex flex-col relative bg-[#FFFDF8]">
        <CookingScreen
          recipe={selectedRecipe}
          onBack={() => setCurrentView("cookbook")}
        />
        {selectedRecipe.notes && (
          <div className="absolute bottom-24 left-5 right-5 bg-[#FFF8E1] p-4 rounded-xl border border-[#FFE082] z-40 shadow-lg pointer-events-none">
            <h4 className="text-[12px] font-extrabold text-[#F57F17] flex items-center gap-1.5 mb-1.5 uppercase tracking-wide">
              <Sparkles size={12} strokeWidth={2.5} /> Personal Notes
            </h4>
            <p className="text-[13px] text-[#212121] leading-relaxed font-medium">
              {selectedRecipe.notes}
            </p>
          </div>
        )}
      </div>
    );
  }

  if (currentView === "add") {
    return (
      <div className="flex-1 flex flex-col bg-[#FFFDF8] h-full overflow-y-auto scrollbar-hide pb-24">
        <div
          className="px-5 pt-2 pb-3 flex items-center gap-3 sticky top-0 bg-[#FFFDF8]/95 backdrop-blur z-20 border-b"
          style={{ borderColor: "rgba(0,0,0,0.05)" }}
        >
          <button
            onClick={() => {
              setCurrentView("cookbook");
              setEditingRecipeId(null);
              setNewRecipe({
                title: "",
                desc: "",
                time: "",
                difficulty: "Easy",
                ingredients: [""],
                steps: [""],
                notes: "",
              });
            }}
            className="w-9 h-9 rounded-full bg-white border flex items-center justify-center shadow-sm"
            style={{ borderColor: "rgba(0,0,0,0.07)" }}
          >
            <ArrowLeft size={17} strokeWidth={2.5} className="text-[#212121]" />
          </button>
          <h2 className="text-[20px] font-extrabold text-[#212121] tracking-tight">
            {editingRecipeId ? "Edit Recipe" : "Add Recipe"}
          </h2>
        </div>
        <div className="p-5 flex flex-col gap-6">
          <div className="w-full h-[160px] bg-[#E8F5E9] border-2 border-dashed border-[#A5D6A7] rounded-[24px] flex flex-col items-center justify-center gap-2 text-[#4CAF50] active:opacity-70 transition-opacity">
            <Camera size={28} strokeWidth={2.5} />
            <span className="text-[13px] font-extrabold">Add Photo</span>
          </div>

          <div className="flex flex-col gap-3">
            <input
              placeholder="Recipe Name"
              value={newRecipe.title}
              onChange={(e) =>
                setNewRecipe({ ...newRecipe, title: e.target.value })
              }
              className="w-full bg-white border border-black/5 rounded-[16px] px-4 py-3.5 text-[15px] font-bold text-[#212121] outline-none shadow-sm"
            />
            <textarea
              placeholder="Brief Description"
              value={newRecipe.desc}
              onChange={(e) =>
                setNewRecipe({ ...newRecipe, desc: e.target.value })
              }
              className="w-full bg-white border border-black/5 rounded-[16px] px-4 py-3.5 text-[14px] text-[#212121] outline-none shadow-sm min-h-[80px] resize-none"
            />
            <div className="flex gap-3">
              <div className="flex-1 bg-white border border-black/5 rounded-[16px] px-4 py-3.5 flex items-center gap-2 shadow-sm">
                <Clock size={16} className="text-[#BDBDBD]" strokeWidth={2.5} />
                <input
                  placeholder="e.g. 30 min"
                  value={newRecipe.time}
                  onChange={(e) =>
                    setNewRecipe({ ...newRecipe, time: e.target.value })
                  }
                  className="w-full text-[14px] font-bold text-[#212121] outline-none bg-transparent"
                />
              </div>
              <div className="flex-1 bg-white border border-black/5 rounded-[16px] px-4 py-3.5 flex items-center gap-2 shadow-sm">
                <Flame size={16} className="text-[#FFA726]" strokeWidth={2.5} />
                <select
                  value={newRecipe.difficulty}
                  onChange={(e) =>
                    setNewRecipe({ ...newRecipe, difficulty: e.target.value })
                  }
                  className="w-full text-[14px] font-bold text-[#212121] outline-none bg-transparent appearance-none"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[15px] font-bold text-[#212121] mb-3 flex items-center justify-between">
              Ingredients
              <button
                onClick={() =>
                  setNewRecipe({
                    ...newRecipe,
                    ingredients: [...newRecipe.ingredients, ""],
                  })
                }
                className="text-[#4CAF50] border border-[#4CAF50] bg-[#F1F8E9] px-3 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1 active:scale-95 transition-transform"
              >
                <Plus size={12} strokeWidth={3} /> Add
              </button>
            </h3>
            <div className="flex flex-col gap-2.5">
              {newRecipe.ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    placeholder={`Ingredient ${idx + 1}`}
                    value={ing}
                    onChange={(e) => {
                      const newIngs = [...newRecipe.ingredients];
                      newIngs[idx] = e.target.value;
                      setNewRecipe({ ...newRecipe, ingredients: newIngs });
                    }}
                    className="flex-1 bg-white border border-black/5 rounded-[14px] px-4 py-3 text-[13px] font-semibold text-[#212121] outline-none shadow-sm"
                  />
                  <button
                    onClick={() =>
                      setNewRecipe({
                        ...newRecipe,
                        ingredients: newRecipe.ingredients.filter(
                          (_, i) => i !== idx,
                        ),
                      })
                    }
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-black/5 text-[#BDBDBD] shadow-sm active:text-[#EF5350] active:bg-[#FFEBEE] transition-colors"
                  >
                    <Trash2 size={14} strokeWidth={2.5} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[15px] font-bold text-[#212121] mb-3 flex items-center justify-between">
              Steps
              <button
                onClick={() =>
                  setNewRecipe({
                    ...newRecipe,
                    steps: [...newRecipe.steps, ""],
                  })
                }
                className="text-[#4CAF50] border border-[#4CAF50] bg-[#F1F8E9] px-3 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1 active:scale-95 transition-transform"
              >
                <Plus size={12} strokeWidth={3} /> Add
              </button>
            </h3>
            <div className="flex flex-col gap-2.5">
              {newRecipe.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="mt-2.5 w-6 h-6 rounded-full bg-[#4CAF50] text-white flex items-center justify-center text-[10px] font-extrabold flex-none">
                    {idx + 1}
                  </span>
                  <textarea
                    placeholder={`Step ${idx + 1}`}
                    value={step}
                    onChange={(e) => {
                      const newSteps = [...newRecipe.steps];
                      newSteps[idx] = e.target.value;
                      setNewRecipe({ ...newRecipe, steps: newSteps });
                    }}
                    className="flex-1 bg-white border border-black/5 rounded-[14px] px-4 py-3 text-[13px] font-medium text-[#212121] outline-none shadow-sm min-h-[60px] resize-none"
                  />
                  <button
                    onClick={() =>
                      setNewRecipe({
                        ...newRecipe,
                        steps: newRecipe.steps.filter((_, i) => i !== idx),
                      })
                    }
                    className="mt-1 w-9 h-9 rounded-full flex items-center justify-center bg-white border border-black/5 text-[#BDBDBD] shadow-sm active:text-[#EF5350] active:bg-[#FFEBEE] transition-colors"
                  >
                    <Trash2 size={14} strokeWidth={2.5} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[15px] font-bold text-[#212121] mb-3">
              Personal Notes
            </h3>
            <textarea
              placeholder="e.g. Use fresh basil, kids prefer extra cheese..."
              value={newRecipe.notes}
              onChange={(e) =>
                setNewRecipe({ ...newRecipe, notes: e.target.value })
              }
              className="w-full bg-[#FFF8E1] border border-[#FFE082] rounded-[16px] px-4 py-3.5 text-[14px] text-[#212121] font-medium outline-none shadow-sm min-h-[100px] resize-none"
            />
          </div>

          <button
            onClick={handleSaveRecipe}
            className="w-full flex items-center justify-center gap-2 py-4 mt-2 bg-gradient-to-br from-[#2E7D32] to-[#4CAF50] text-white text-[15px] font-extrabold rounded-[18px] shadow-lg active:scale-[0.98] transition-transform"
          >
            <Check size={18} strokeWidth={3} /> Save Recipe
          </button>
        </div>
      </div>
    );
  }

  if (currentView === "paste") {
    return (
      <div className="flex-1 flex flex-col bg-[#FFFDF8] h-full overflow-y-auto scrollbar-hide pb-24">
        <div
          className="px-5 pt-2 pb-3 flex items-center gap-3 sticky top-0 bg-[#FFFDF8]/95 backdrop-blur z-20 border-b"
          style={{ borderColor: "rgba(0,0,0,0.05)" }}
        >
          <button
            onClick={() => setCurrentView("cookbook")}
            className="w-9 h-9 rounded-full bg-white border flex items-center justify-center shadow-sm"
            style={{ borderColor: "rgba(0,0,0,0.07)" }}
          >
            <ArrowLeft size={17} strokeWidth={2.5} className="text-[#212121]" />
          </button>
          <h2 className="text-[20px] font-extrabold text-[#212121] tracking-tight">
            Paste Recipe
          </h2>
        </div>
        <div className="p-5 flex flex-col gap-4 flex-1">
          <div
            className="bg-white p-4 rounded-[16px] border shadow-sm"
            style={{ borderColor: "rgba(0,0,0,0.05)" }}
          >
            <p className="text-[13px] text-[#757575] leading-relaxed font-medium">
              Found a recipe online or have one saved in your notes? Paste the
              entire text here and we'll save it as a new card in your cookbook.
            </p>
          </div>
          <textarea
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            placeholder="Paste recipe title, ingredients, and instructions here..."
            className="flex-1 w-full bg-white border border-black/5 rounded-[18px] p-5 text-[14px] font-medium text-[#212121] outline-none shadow-inner resize-none min-h-[350px]"
          />
          <button
            onClick={handleSavePasted}
            disabled={!pasteText.trim()}
            className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-br from-[#2E7D32] to-[#4CAF50] text-white text-[15px] font-extrabold rounded-[18px] shadow-lg active:scale-[0.98] transition-transform disabled:opacity-50 disabled:grayscale"
          >
            <Check size={18} strokeWidth={3} /> Save to Cookbook
          </button>
        </div>
      </div>
    );
  }

  if (currentView === "cookbook") {
    return (
      <div className="flex-1 flex flex-col bg-[#FFFDF8] h-full overflow-y-auto scrollbar-hide pb-24">
        <div
          className="px-5 pt-2 pb-3 flex items-center gap-3 sticky top-0 bg-[#FFFDF8]/95 backdrop-blur z-20 border-b"
          style={{ borderColor: "rgba(0,0,0,0.05)" }}
        >
          <button
            onClick={() => setCurrentView("profile")}
            className="w-9 h-9 rounded-full bg-white border flex items-center justify-center shadow-sm"
            style={{ borderColor: "rgba(0,0,0,0.07)" }}
          >
            <ArrowLeft size={17} strokeWidth={2.5} className="text-[#212121]" />
          </button>
          <h2 className="text-[20px] font-extrabold text-[#212121] tracking-tight">
            My Cookbook
          </h2>
        </div>

        <div className="px-5 py-5 flex gap-3">
          <button
            onClick={() => {
              setEditingRecipeId(null);
              setNewRecipe({
                title: "",
                desc: "",
                time: "",
                difficulty: "Easy",
                ingredients: [""],
                steps: [""],
                notes: "",
              });
              setCurrentView("add");
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-br from-[#2E7D32] to-[#4CAF50] text-white text-[14px] font-extrabold rounded-[16px] shadow-md active:scale-[0.98] transition-transform"
          >
            <Plus size={16} strokeWidth={3} /> Add Recipe
          </button>
          <button
            onClick={() => setCurrentView("paste")}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white border-2 border-[#4CAF50] text-[#4CAF50] text-[14px] font-extrabold rounded-[16px] shadow-sm active:scale-[0.98] transition-transform"
          >
            <Upload size={16} strokeWidth={2.5} /> Paste Recipe
          </button>
        </div>

        <div className="px-5 flex flex-col gap-4">
          {myRecipes.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-[22px] overflow-hidden border shadow-sm active:scale-[0.99] transition-transform cursor-pointer"
              style={{ borderColor: "rgba(0,0,0,0.07)" }}
              onClick={() => {
                setSelectedRecipe(r);
                setCurrentView("cooking");
              }}
            >
              <div className="relative">
                <img
                  src={r.image}
                  alt={r.title}
                  className="w-full h-[150px] object-cover bg-[#E8F5E9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setNewRecipe({
                        title: r.title,
                        desc: r.desc,
                        time: r.time,
                        difficulty: r.difficulty,
                        ingredients: [...r.ingredients],
                        steps: [...r.steps],
                        notes: r.notes || "",
                      });
                      setEditingRecipeId(r.id);
                      setCurrentView("add");
                    }}
                    className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md text-[#212121] active:scale-95 transition-transform"
                  >
                    <SlidersHorizontal size={14} strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMyRecipes((prev) => prev.filter((x) => x.id !== r.id));
                    }}
                    className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md text-[#EF5350] active:scale-95 transition-transform"
                  >
                    <Trash2 size={14} strokeWidth={2.5} />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 flex gap-1.5">
                  {r.tags.map((t: string) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-[3px] rounded-full bg-[#E8F5E9] text-[#2E7D32]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-[16px] font-extrabold text-[#212121] tracking-tight mb-1 truncate">
                  {r.title}
                </h3>
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center gap-1 text-[12px] font-medium text-[#757575]">
                    <Clock
                      size={12}
                      strokeWidth={2.5}
                      className="text-[#4CAF50]"
                    />{" "}
                    {r.time}
                  </span>
                  <span className="flex items-center gap-1 text-[12px] font-medium text-[#757575]">
                    <Flame
                      size={12}
                      strokeWidth={2.5}
                      className="text-[#FFA726]"
                    />{" "}
                    {r.difficulty}
                  </span>
                </div>
                <button className="w-full bg-[#F1F8E9] text-[#2E7D32] font-extrabold text-[13px] py-3 rounded-[14px] flex items-center justify-center gap-2">
                  <UtensilsCrossed size={14} strokeWidth={2.5} /> View Recipe
                </button>
              </div>
            </div>
          ))}
          {myRecipes.length === 0 && (
            <div className="text-center py-10">
              <ChefHat
                size={40}
                strokeWidth={1.5}
                className="text-[#BDBDBD] mx-auto mb-3"
              />
              <p className="text-[14px] font-bold text-[#757575]">
                Your cookbook is empty
              </p>
              <p className="text-[12px] text-[#BDBDBD] mt-1">
                Add or paste your favorite recipes here.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide pb-24 relative bg-[#FFFDF8]">
      <div className="relative h-[140px]">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #1B5E20, #4CAF50)" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-5 pt-3">
          <label className="w-16 h-16 rounded-full overflow-hidden border-[3px] border-white shadow-lg mb-2 cursor-pointer relative group flex-none">
            <img
              src={profilePic}
              alt="Randima"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-active:opacity-100 transition-opacity">
              <Camera
                size={20}
                className="text-white drop-shadow-md"
                strokeWidth={2.5}
              />
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          <h2 className="text-[18px] font-extrabold text-white tracking-tight">
            Randima Alexander
          </h2>
          <p className="text-[12px] font-medium text-white/80">
            🌿 Cook Smart • Waste Less
          </p>
        </div>
      </div>

      <div className="mx-5 mt-4 mb-5 grid grid-cols-3 gap-2.5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-[16px] py-3 text-center border shadow-sm"
            style={{ borderColor: "rgba(0,0,0,0.07)" }}
          >
            <div className="text-[18px] font-extrabold text-[#212121]">
              {s.val}
            </div>
            <div className="text-[10px] text-[#757575] font-medium mt-0.5 leading-tight">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 flex flex-col gap-2.5">
        <button
          onClick={() => setCurrentView("cookbook")}
          className="bg-white rounded-[16px] px-4 py-4 flex items-center gap-3 border shadow-sm active:scale-[0.98] transition-transform"
          style={{ borderColor: "rgba(0,0,0,0.07)" }}
        >
          <span className="text-[22px] flex-none">📖</span>
          <div className="flex-1 text-left">
            <p className="text-[14px] font-extrabold text-[#212121]">
              My Cookbook
            </p>
            <p className="text-[11px] font-medium text-[#757575] mt-0.5">
              {myRecipes.length} saved personal recipes
            </p>
          </div>
          <ChevronRight
            size={16}
            strokeWidth={2.5}
            className="text-[#BDBDBD]"
          />
        </button>

        <div className="h-px bg-[#EEEEEE] my-1 mx-2" />

        {[
          { icon: "🥗", label: "Dietary Preferences", value: settings.diet },
          {
            icon: "⚠️",
            label: "Allergens",
            value: settings.allergens.length
              ? settings.allergens.join(", ")
              : "None",
          },
          { icon: "👨‍👩‍👧", label: "Household Size", value: settings.household },
          { icon: "🔔", label: "Notifications", value: settings.notifications },
          { icon: "🌍", label: "Language", value: settings.language },
        ].map((row) => (
          <button
            key={row.label}
            onClick={() => setSheetContent(row.label)}
            className="bg-white rounded-[16px] px-4 py-3.5 flex items-center gap-3 border shadow-sm active:bg-[#F9FBF9] transition-colors"
            style={{ borderColor: "rgba(0,0,0,0.07)" }}
          >
            <span className="text-[20px] flex-none">{row.icon}</span>
            <div className="flex-1 text-left">
              <p className="text-[13px] font-bold text-[#212121]">
                {row.label}
              </p>
              <p className="text-[11px] font-medium text-[#757575] truncate">
                {row.value}
              </p>
            </div>
            <ChevronRight
              size={15}
              strokeWidth={2.5}
              className="text-[#BDBDBD]"
            />
          </button>
        ))}
      </div>

      <div className="mx-5 mt-5">
        <button
          className="w-full py-3.5 rounded-[16px] text-[13px] font-extrabold text-[#EF5350] border-2 border-dashed active:opacity-70 transition-opacity"
          style={{ borderColor: "#FFCDD2", backgroundColor: "#FFEBEE" }}
        >
          Sign Out
        </button>
      </div>

      <AnimatePresence>
        {sheetContent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
              onClick={closeSheet}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 inset-x-0 bg-white rounded-t-[32px] z-50 p-6 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-extrabold text-[#212121]">
                  {sheetContent}
                </h3>
                <button
                  onClick={closeSheet}
                  className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#757575] active:scale-90 transition-transform"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              </div>
              {renderSheetContent()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
// ─── Bottom navigation ────────────────────────────────────────────────────────
type Tab = "home" | "scan" | "favorites" | "shopping" | "profile";
const NAV: { id: Tab; label: string; Icon: React.ElementType }[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "scan", label: "Scan", Icon: Camera },
  { id: "favorites", label: "Saved", Icon: Heart },
  { id: "shopping", label: "List", Icon: ShoppingCart },
  { id: "profile", label: "Profile", Icon: User },
];

function BottomNav({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (t: Tab) => void;
}) {
  return (
    <div
      className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-xl border-t flex items-end justify-around pt-2 pb-4"
      style={{ borderColor: C.border }}
    >
      {NAV.map(({ id, label, Icon }) => {
        const on = active === id;
        const isScan = id === "scan";
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="flex flex-col items-center gap-[3px] relative px-2"
          >
            {isScan ? (
              <div
                className={`w-12 h-12 -mt-7 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-90 ${on ? "scale-110" : ""}`}
                style={{
                  background: "linear-gradient(135deg, #2E7D32, #4CAF50)",
                  boxShadow: "0 6px 20px rgba(76,175,80,0.5)",
                }}
              >
                <Icon size={22} className="text-white" strokeWidth={2} />
              </div>
            ) : (
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${on ? "bg-[#E8F5E9]" : ""}`}
              >
                <Icon
                  size={20}
                  strokeWidth={on ? 2.5 : 1.8}
                  className={on ? "text-[#4CAF50]" : "text-[#BDBDBD]"}
                />
              </div>
            )}
            <span
              className={`text-[10px] font-bold ${isScan ? "mt-0.5" : ""} ${on ? "text-[#4CAF50]" : "text-[#BDBDBD]"}`}
            >
              {label}
            </span>
            {on && !isScan && (
              <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#4CAF50]" />
            )}
          </button>
        );
      })}
    </div>
  );
}

//App_________________________________________________
export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  type SubScreen = "none" | "results" | "cooking";
  const [sub, setSub] = useState<SubScreen>("none");
  const [activeRecipe, setActiveRecipe] = useState(RECIPES[0]);

  const handleViewRecipe = (r: (typeof RECIPES)[0]) => {
    setActiveRecipe(r);
    setSub("cooking");
  };

  const handleScan = () => {
    setTab("scan");
    setSub("none");
  };

  const handleResults = () => setSub("results");
  const handleBackFromResults = () => setSub("none");
  const handleBackFromCooking = () => setSub("results");

  const handleTabChange = (t: Tab) => {
    setTab(t);
    setSub("none");
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #E8F5E9 0%, #FFFDE7 40%, #F3E5F5 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* FIX: 
        1. max-w-[390px]: Limits app width to phone size.
        2. w-full: Allows it to be responsive on mobile.
        3. h-[100dvh]: Ensures it fills the screen perfectly.
      */}
      <div 
        className="relative bg-[#FFFDF8] shadow-2xl overflow-hidden flex flex-col w-full max-w-[390px] h-[100dvh]"
      >
        <AnimatePresence mode="wait">
          {sub === "none" && (
            <motion.div
              key={`tab-${tab}`}
              className="flex-1 flex flex-col h-full relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="flex-1 overflow-y-auto scrollbar-hide pt-8">
                {tab === "home" && <HomeScreen onScan={handleScan} onViewRecipe={handleViewRecipe} />}
                {tab === "scan" && <ScanScreen onResults={handleResults} />}
                {tab === "favorites" && <FavoritesScreen onViewRecipe={handleViewRecipe} />}
                {tab === "shopping" && <ShoppingScreen />}
                {tab === "profile" && <ProfileScreen />}
              </div>
              <div className="flex-none bg-white/95 backdrop-blur-xl border-t border-[#EDEDED] pb-[env(safe-area-inset-bottom)]">
                <BottomNav active={tab} onChange={handleTabChange} />
              </div>
            </motion.div>
          )}

          {sub === "results" && (
            <motion.div
              key="results"
              className="flex-1 flex flex-col h-full relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="flex-1 overflow-y-auto scrollbar-hide pt-8">
                <ResultsScreen onBack={handleBackFromResults} onViewRecipe={handleViewRecipe} />
              </div>
              <div className="flex-none bg-white/95 backdrop-blur-xl border-t border-[#EDEDED] pb-[env(safe-area-inset-bottom)]">
                <BottomNav active={tab} onChange={handleTabChange} />
              </div>
            </motion.div>
          )}

          {sub === "cooking" && (
            <motion.div
              key={`cooking-${activeRecipe.id}`}
              className="flex-1 flex flex-col h-full relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="flex-1 overflow-y-auto scrollbar-hide pt-8">
                <CookingScreen recipe={activeRecipe} onBack={handleBackFromCooking} />
              </div>
              <div className="flex-none bg-white/95 backdrop-blur-xl border-t border-[#EDEDED] pb-[env(safe-area-inset-bottom)]">
                <BottomNav active={tab} onChange={handleTabChange} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
