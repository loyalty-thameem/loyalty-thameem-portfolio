export type GalleryCategory = "professional" | "personal" | "fun";

export type GalleryImage = {
  src: string;
  alt: string;
};

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const galleryImages: Record<GalleryCategory, GalleryImage[]> = {
  professional: [],
  personal: [
    { src: asset("images/personal/gallery-01.jpg"), alt: "Thameem seated near red flowers" },
    { src: asset("images/personal/gallery-02.jpg"), alt: "Thameem seated in garden area" },
    { src: asset("images/personal/gallery-03.jpg"), alt: "Thameem standing outdoors near corporate building" },
    { src: asset("images/personal/gallery-04.jpg"), alt: "Thameem with pink flowers" },
    { src: asset("images/personal/gallery-05.jpg"), alt: "Thameem seated outdoors in casual outfit" },
    { src: asset("images/personal/gallery-06.jpg"), alt: "Thameem traditional outfit portrait" },
    { src: asset("images/personal/IMG_20230227_204404.jpg"), alt: "Thameem indoor selfie in a dark shirt" },
    { src: asset("images/personal/IMG_20241109_141207.jpg"), alt: "Thameem seated at a conference hall table" },
    { src: asset("images/personal/IMG_20241113_133519.jpg"), alt: "Thameem standing near greenery in a navy shirt" },
    { src: asset("images/personal/IMG_20250204_115358.jpg"), alt: "Thameem by a train-themed doorway indoors" },
    { src: asset("images/personal/IMG_20250205_140522.jpg"), alt: "Thameem portrait in a blue patterned shirt outdoors" },
    { src: asset("images/personal/IMG_20250207_213114.jpg"), alt: "Thameem seated on a circular bench in a garden area" },
    { src: asset("images/personal/IMG_20250224_105117.jpg"), alt: "Thameem adjusting sleeve in a light blue shirt" },
    { src: asset("images/personal/IMG_20250225_164742.jpg"), alt: "Thameem standing in a coral kurta in an open plaza" },
    { src: asset("images/personal/IMG_20250228_120554.jpg"), alt: "Thameem standing in an office lobby wearing a striped shirt" },
    { src: asset("images/personal/IMG_20250313_143723.jpg"), alt: "Thameem smiling in a printed shirt outdoors" },
    { src: asset("images/personal/IMG_20250313_143744.jpg"), alt: "Thameem inside an office lobby in a striped shirt" },
    { src: asset("images/personal/IMG_20250323_160650.jpg"), alt: "Thameem on a small boat facing a riverside view" },
    { src: asset("images/personal/IMG-20241022-WA0049.jpg"), alt: "Thameem in white traditional attire with sunglasses outdoors" },
    { src: asset("images/personal/IMG-20241026-WA0177.jpg"), alt: "Thameem leaning against a wall in blue formal casual wear" }
  ],
  fun: []
};
