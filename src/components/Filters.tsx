import type { SearchFilters } from '../type/Property'

interface FiltersProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
}

export default function Filters({ filters, onFiltersChange }: FiltersProps) {
  const handleChange = (key: keyof SearchFilters, value: string | number | undefined) => {
    onFiltersChange({ ...filters, [key]: value || undefined })
  }

  const handleNumberChange = (key: keyof SearchFilters, value: string) => {
    const numValue = value === '' ? undefined : Number(value)
    onFiltersChange({ ...filters, [key]: numValue })
  }

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
    
        <div>
          <label className="block text-sm font-medium mb-1">Bedrooms</label>
          <select
            value={filters.bedrooms || ''}
            onChange={(e) => handleChange('bedrooms', Number(e.target.value))}
            className="w-full px-3 py-2 border rounded text-sm"
          >
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </div>
      
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            value={filters.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
            className="w-full px-3 py-2 border rounded text-sm"
            placeholder="Any"
          />
        </div>
            <div>
          <label className="block text-sm font-medium mb-1">Min Price</label>
          <input
            type="number"
            value={filters.minPrice || ''}
            onChange={(e) => handleNumberChange('minPrice', e.target.value)}
            className="w-full px-3 py-2 border rounded text-sm"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Max Price</label>
          <input
            type="number"
            value={filters.maxPrice || ''}
            onChange={(e) => handleNumberChange('maxPrice', e.target.value)}
            className="w-full px-3 py-2 border rounded text-sm"
            placeholder="Any"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={() => onFiltersChange({})}
            className="w-full px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}