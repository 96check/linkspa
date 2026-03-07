export interface Spa {
  id: string;
  user_id: string | null;
  slug: string;
  spa_name: string | null;
  bio: string | null;
  logo_url: string | null;
  theme: string | null;
  /** @deprecated Dùng formatAddressFromParts(spa) hoặc các trường address_* */
  address: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state_region: string | null;
  postal_code: string | null;
  country: string | null;
  /** Số điện thoại hiển thị trên trang */
  phone: string | null;
  /** URL Google Review (ví dụ: https://search.google.com/local/writereview?placeid=...) */
  google_review_url: string | null;
  created_at: string;
}

/** Format địa chỉ từ các trường rời để hiển thị hoặc dùng trong admin */
export function formatAddressFromParts(spa: Pick<Spa, "address" | "address_line1" | "address_line2" | "city" | "state_region" | "postal_code" | "country">): string | null {
  const parts = [
    spa.address_line1,
    spa.address_line2,
    [spa.city, spa.state_region].filter(Boolean).join(", "),
    spa.postal_code,
    spa.country,
  ].filter(Boolean) as string[];
  if (parts.length > 0) return parts.join(", ");
  return spa.address;
}

export interface Link {
  id: string;
  spa_id: string;
  type: string | null;
  title: string | null;
  url: string | null;
  order: number;
  active: boolean;
  created_at: string;
}
