// Heartbaker Post Maker: brand settings.
// Edit this file to change formats, safe zones, logo files or fonts. The page reads nothing else.
// Status of each value is tracked in docs/workflows/social-post-workflow.md.

window.HB_CONFIG = {
  // Brand assets live in docs/brand/assets. This path works when the repo root is served.
  assetBase: "../../docs/brand/assets/",

  // Logo files in the Canva Brand Kit. Add the white and black files here once exported.
  // null means the file is not installed yet.
  logos: {
    colour: "logo-colour.svg",
    white: null,
    black: null,
  },

  // The Aperitif Collection script lockup (Amsterdam Three), derived from Jere's PNG.
  collection: {
    phrase: "The Aperitif Collection",
    black: "the-aperitif-collection_black.png",
    white: "the-aperitif-collection_white.png",
  },

  // Thai text uses Sarabun (Jere's decision). English uses Quicksand until Jere confirms the English post font.
  fonts: {
    th: "Sarabun",
    en: "Quicksand",
    preload: ["700 40px Sarabun", "400 40px Sarabun", "700 40px Quicksand", "500 40px Quicksand"],
  },

  colours: {
    ink: "#1A1919", // wordmark colour in the logo file
    paper: "#FFFFFF",
    red: "#D8262C", // main red in the logo file; used for the call-to-action pill (to approve)
  },

  // Proposed safe zones in pixels (to approve). Platform figures vary, so these take the cautious end.
  formats: [
    { id: "feed", label: "Feed 4:5", note: "Instagram, Facebook", w: 1080, h: 1350, safe: { top: 80, bottom: 80, left: 60, right: 60 } },
    { id: "vertical", label: "Vertical 9:16", note: "Stories, Reels, TikTok", w: 1080, h: 1920, safe: { top: 290, bottom: 480, left: 60, right: 220 } },
    { id: "square", label: "Square 1:1", note: "LINE", w: 1080, h: 1080, safe: { top: 60, bottom: 60, left: 60, right: 60 } },
  ],

  // Logo size and clear space (to approve): width as a share of canvas width.
  logoWidthRatio: 0.2,
  logoPlateThreshold: 0.42, // below this brightness the colour logo sits on a white plate if no white file exists
};
