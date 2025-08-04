import axios from 'axios'
import type { PropertiesResponse, SearchFilters } from '../type/Property'

interface FetchPropertiesParams {
  page?: number
  pageSize?: number
  filters?: SearchFilters
}

export const fetchProperties = async ({ page = 1, pageSize = 25, filters = {} }: FetchPropertiesParams = {}): Promise<PropertiesResponse> => {
  const params = new URLSearchParams()
  params.append('pagination[page]', page.toString())
  params.append('pagination[pageSize]', pageSize.toString())
  
  if (filters.minPrice) params.append('filters[price][$gte]', filters.minPrice.toString())
  if (filters.maxPrice) params.append('filters[price][$lte]', filters.maxPrice.toString())
  if (filters.bedrooms) params.append('filters[bedroom][$eq]', filters.bedrooms.toString())
  if (filters.city) params.append('filters[address][city][$contains]', filters.city.toString())
  
  const { data } = await axios.get<PropertiesResponse>(`https://mira-strapi-dev.q.starberry.com/api/properties?${params}`)
  return data
}
