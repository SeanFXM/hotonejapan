import { ProductPage } from "@/components/product-page"
import { ProductConfig } from "@/types/product-config"
import configData from "./product.config.json"

const config = configData as ProductConfig

export default function ProductDetailPage() {
  return <ProductPage config={config} />
}
