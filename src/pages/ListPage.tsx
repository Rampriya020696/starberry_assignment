import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { fetchProperties } from '../hook/api'
import { useDebounce } from '../hook/useDebounce'
import type { Property, SearchFilters } from '../type/Property'
import Header from '../components/Header'
import Filters from '../components/Filters'
import Pagination from '../components/Pagination'

export default function ListPage() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<SearchFilters>({})
  const debouncedFilters = useDebounce(filters, 500)
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['properties', currentPage, debouncedFilters],
    queryFn: () => fetchProperties({ page: currentPage, filters: debouncedFilters }),
    enabled: true,
  })
  
  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading properties...</p>
      </div>
    </div>
  )
  if (isError) return <div className="p-6 text-red-600">Error: {(error as Error).message}</div>

  return (
    <div>
      <Header />
      <div className="p-6">
        <Filters filters={filters} onFiltersChange={handleFiltersChange} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.data.map((property: Property) => {
        const attr = property.attributes
        return (
          <div 
            key={property.id} 
            className="bg-white rounded shadow p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/detail/${property.id}`)}
          >
            <img
              src={attr.thumbnail}
              alt={attr.title}
              className="w-full h-48 object-cover rounded mb-4"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNGM0Y0RjYiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNkI3MjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UHJvcGVydHkgTG9nbzwvdGV4dD48L3N2Zz4='
              }}
            />
            <h2 className="text-xl font-semibold">{attr.title}</h2>
            <p className="text-sm text-gray-600">{attr.display_address}</p>
            <div className="flex justify-between text-sm mt-2">
              <span>{attr.bedroom} Bed</span>
              <span className="capitalize">{attr.search_type === 'sales' ? 'Sale' : 'Rent'}</span>
              <span>{attr.floorarea_min || attr.area || 'N/A'} sqft</span>
            </div>
            <div className="text-blue-600 font-semibold mt-2">
              £{attr.price.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Listed on {new Date(attr.createdAt).toLocaleDateString()}
            </div>
          </div>
        )
      })}
        </div>
        <Pagination 
          currentPage={currentPage}
          totalPages={data?.meta.pagination.pageCount || 1}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
