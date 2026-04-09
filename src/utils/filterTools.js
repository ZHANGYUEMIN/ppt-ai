const PRICING_ORDER = {
  免费: 1,
  免费额度: 2,
  教育版: 3,
  试用后付费: 4,
  订阅付费: 5,
  企业版: 6,
}

function matchesSearch(tool, q) {
  if (!q.trim()) return true
  const s = q.trim().toLowerCase()
  const hay = [
    tool.name,
    tool.englishName || '',
    tool.summary,
    tool.bestFor || '',
    ...(tool.tags || []),
    ...(tool.pros || []),
  ]
    .join(' ')
    .toLowerCase()
  return hay.includes(s)
}

function matchesRegion(tool, region) {
  if (region === 'all') return true
  if (region === 'domestic') return tool.region === '国内'
  if (region === 'foreign') return tool.region === '国外'
  return true
}

function matchesType(tool, type) {
  if (type === 'all') return true
  return tool.type === type
}

function matchesPricing(tool, pricing) {
  if (pricing === 'all') return true
  return tool.pricingModel === pricing
}

function matchesVpn(tool, vpn) {
  if (vpn === 'all') return true
  const map = { no: 'no', yes: 'yes', depends: 'depends' }
  return tool.requiresVpn === map[vpn]
}

function matchesPayments(tool, selectedPayments) {
  if (!selectedPayments.length) return true
  const pm = tool.paymentMethods || []
  return selectedPayments.some((p) => pm.includes(p))
}

function matchesLanguage(tool, lang) {
  if (lang === 'all') return true
  if (lang === 'chinese') {
    return tool.supportsChinese === true || tool.supportsChinese === 'partial'
  }
  if (lang === 'english') return tool.languageSupport === '英文'
  if (lang === 'multilingual') return tool.languageSupport === '多语言'
  return true
}

function matchesFavorites(tool, favoritesOnly, favoriteSet) {
  if (!favoritesOnly) return true
  return favoriteSet.has(tool.id)
}

export function filterTools(tools, filters, favoriteIds) {
  const favSet = new Set(favoriteIds)
  const {
    search,
    region,
    toolType,
    pricing,
    vpn,
    payments,
    language,
    favoritesOnly,
  } = filters

  return tools.filter((t) => {
    return (
      matchesSearch(t, search) &&
      matchesRegion(t, region) &&
      matchesType(t, toolType) &&
      matchesPricing(t, pricing) &&
      matchesVpn(t, vpn) &&
      matchesPayments(t, payments) &&
      matchesLanguage(t, language) &&
      matchesFavorites(t, favoritesOnly, favSet)
    )
  })
}

function recommendScore(t) {
  return (
    t.designScore +
    t.automationScore +
    t.chineseFriendlinessScore +
    (t.teacherFriendly ? 6 : 0)
  )
}

export function sortTools(list, sortBy) {
  const arr = [...list]
  switch (sortBy) {
    case 'price':
      arr.sort(
        (a, b) =>
          (PRICING_ORDER[a.pricingModel] ?? 99) - (PRICING_ORDER[b.pricingModel] ?? 99)
      )
      break
    case 'teacher':
      arr.sort((a, b) => {
        const tf = Number(b.teacherFriendly) - Number(a.teacherFriendly)
        if (tf !== 0) return tf
        return b.chineseFriendlinessScore - a.chineseFriendlinessScore
      })
      break
    case 'design':
      arr.sort((a, b) => b.designScore - a.designScore)
      break
    case 'automation':
      arr.sort((a, b) => b.automationScore - a.automationScore)
      break
    case 'chinese':
      arr.sort((a, b) => b.chineseFriendlinessScore - a.chineseFriendlinessScore)
      break
    case 'default':
    default:
      arr.sort((a, b) => recommendScore(b) - recommendScore(a))
      break
  }
  return arr
}

export function computeStats(tools) {
  return {
    total: tools.length,
    domestic: tools.filter((t) => t.region === '国内').length,
    foreign: tools.filter((t) => t.region === '国外').length,
    freeTier: tools.filter((t) => ['免费', '免费额度'].includes(t.pricingModel)).length,
    noVpn: tools.filter((t) => t.requiresVpn === 'no').length,
    plugins: tools.filter((t) => t.type.includes('插件')).length,
  }
}
