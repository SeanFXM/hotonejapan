/**
 * 产品路径到 manual 文件名的映射
 * 格式: "brand/product-slug" => "manual-filename.pdf"
 */
export const manualMapping: Record<string, string> = {
  // Strymon
  "strymon/ec-1": "EC-1.pdf",
  "strymon/pch": "PCHアクティブ DI ボックス.pdf",
  "strymon/fairfax": "strymon_fairfax_UM_JP.pdf",
  "strymon/superkar-plus": "SuperKar+ .pdf",
  
  // MusicomLAB
  "musicomlab/efx-10d": "MusicomLAB_EFX-10D_JP_20251104.pdf",
  "musicomlab/mtx-5": "MusicomLAB_MTX-5_JP_20251104.pdf",
  "musicomlab/efx-mk-vi": "MusicomLAB_EFX_MKVI_JP_20251104.pdf",
  "musicomlab/parallelizer-ii": "manual_parallelizer2_jp_20251104.pdf",
  "musicomlab/system-interface-si-01": "manual_si01_jp_20251104.pdf",
  
  // Hotone
  "hotone/verbera": "VERBERA（NC-200）.pdf",
  "hotone/ampero-ii": "AMPERO Ⅱ.pdf",
  "hotone/pulze-control": "PULZE CONTROL（EC-2）.pdf",
  "hotone/pulze-mini": "PULZE MINI（AP-5WH）.pdf",
  "hotone/ampero-switch-plus": "AMPERO SWITCH+.pdf",
  "hotone/british-invasion": "BRITISH INVASION.pdf",
  "hotone/soul-press": "SOUL PRESSⅡ.pdf",
  "hotone/tuner-press": "TUNER PRESS.pdf",
  "hotone/wong-press-ii": "WONG PRESS.pdf",
  "hotone/ampero": "AMPERO.pdf",
  "hotone/ampero-mini": "AMPERO Mini.pdf",
  "hotone/ampero-one": "AMPERO ONE.pdf",
  "hotone/ampero-press": "AMPERO PRESS.pdf",
  "hotone/ampero-press-25k": "AMPERO PRESS 25k.pdf",
  "hotone/ampero-ii-stage": "AMPERO Ⅱ STAGE.pdf",
  "hotone/ampero-ii-stomp": "AMPERO Ⅱ STOMP.pdf",
  "hotone/ampero-ii-press": "AMPERO Ⅱ PRESS.pdf",
  "hotone/ampero-control": "AMPERO CONTROL.pdf",
  "hotone/binary-amp": "BINARY AMP.pdf",
  "hotone/binary-eko": "BINARY EKO.pdf",
  "hotone/binary-ir-cab": "BINARY IR CAB.pdf",
  "hotone/binary-mod": "BINARY MOD.pdf",
  "hotone/mojo-diamond": "Mojo Diamond.pdf",
  "hotone/omni-ac": "OMNI AC.pdf",
  "hotone/omni-ir": "OMNI IR.pdf",
  "hotone/patch-kommander-ls-10": "PATCH KOMMANDER LS-10.pdf",
  "hotone/purple-wind": "Purple Wind.pdf",
  "hotone/pulze": "PULZE.pdf",
  "hotone/wally-plus": "WALLY+.pdf",
  "hotone/xtomp": "XTOMP.pdf",
  
  // Audient
  "audient/nero": "audient_nero_JP_1031.pdf",
  "audient/evo8": "audient_evo8_JP_1028.pdf",
  "audient/evo4": "audient_evo4_JP_1028.pdf",
  "audient/id14mk2": "audient_id14mk2_JP_v1.3_1029.pdf",
  "audient/id48": "audient_id48_JP_1104.pdf",
  "audient/id4mk2": "audient_id4mk2_JP_v1.3_1029.pdf",
  "audient/oria-mini": "ORIA Mini Manual_JP_1027.pdf",
  "audient/evostarterbundle": "EVO_bundle_manual_JP_1104.pdf",
  "audient/evosp8": "audient_evosp8_JP_1028.pdf",
  "audient/id44mk2": "audient_id44mk2_JP_1030.pdf",
  "audient/evo16": "audient_evo16_JP_1028.pdf",
  "audient/id24": "audient_id24_JP_1030.pdf",
  "audient/oria": "ORIA Manual_JP_1104.pdf",
  "audient/sono": "audient_sono_JP_1104.pdf",
  "audient/id44": "audient_id44_JP_1104.pdf",
  "audient/id22": "audient_id22_JP_1104.pdf",
  "audient/asp880": "audient_asp880_JP_1104.pdf",
}

/**
 * 根据品牌和产品路径获取 manual 文件路径
 * @param brand 品牌名称 (如 "strymon", "hotone")
 * @param productSlug 产品 slug (如 "ec-1", "pch")
 * @returns manual 文件的完整路径，如果不存在则返回 null
 */
export function getManualPath(brand: string, productSlug: string): string | null {
  const key = `${brand}/${productSlug}`
  const manualFileName = manualMapping[key]
  
  if (!manualFileName) {
    return null
  }
  
  // 使用 API 路由来提供文件下载
  return `/api/manual/${brand}/${encodeURIComponent(manualFileName)}`
}

/**
 * 根据品牌和产品路径获取 manual 文件名（用于下载）
 * @param brand 品牌名称
 * @param productSlug 产品 slug
 * @returns manual 文件名，如果不存在则返回 null
 */
export function getManualFileName(brand: string, productSlug: string): string | null {
  const key = `${brand}/${productSlug}`
  return manualMapping[key] || null
}

