import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchProperties } from '../hook/api'
import Header from '../components/Header'


export default function DetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['properties'],
    queryFn: () => fetchProperties({}),
  })

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
  if (isError) return <div className="p-6 text-red-600">Error loading property</div>

  const property = data?.data.find(p => p.id === Number(id))
  if (!property) return <div className="p-6">Property not found</div>

  const attr = property.attributes

  return (
    <div>
      <Header />
      <div className="p-6 max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/list')}
          className="mb-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
        >
          ← Back to List
        </button>
        
        <div className="bg-white rounded shadow p-6">
          <img
            src={attr.thumbnail}
            alt={attr.title}
            className="w-full h-64 object-cover rounded mb-6"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNGM0Y0RjYiLz48dGV4dCB4PSI0MDAiIHk9IjIwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNkI3MjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UHJvcGVydHkgTG9nbzwvdGV4dD48L3N2Zz4='
            }}
          />
          
          <h1 className="text-3xl font-bold mb-2">{attr.title}</h1>
          <p className="text-gray-600 mb-4">{attr.display_address}</p>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded">
              <div className="text-2xl font-bold">{attr.bedroom}</div>
              <div className="text-sm text-gray-600">Bedrooms</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded">
              <div className="text-2xl font-bold">{attr.bathroom}</div>
              <div className="text-sm text-gray-600">Bathrooms</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded">
              <div className="text-2xl font-bold">{attr.floorarea_min || attr.area || 'N/A'}</div>
              <div className="text-sm text-gray-600">sqft</div>
            </div>
          </div>
          
          <div className="text-3xl font-bold text-blue-600 mb-6">
            £{attr.price.toLocaleString()}
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{attr.long_description || attr.description}</p>
          </div>
          
          <div className="text-sm text-gray-500">
            Listed on {new Date(attr.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  )
}