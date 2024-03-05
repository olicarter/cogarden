import PlotDetailsList from '@/components/PlotDetailsList'
import Map from '@/components/Map'
import Nav from '@/components/Nav'
import { createClient } from '@/utils/supabase/server'

export default async function Index() {
  const supabase = createClient()

  const { data: nearbyPlots } = await supabase.rpc('nearby_plots', {
    lat: 59.445,
    lng: 24.68701,
  })

  if (nearbyPlots === null || nearbyPlots.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Map nearbyPlots={nearbyPlots} />
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-2 justify-between min-h-svh">
          <div className="p-2 pb-0">
            <Nav />
          </div>
          <PlotDetailsList nearbyPlots={nearbyPlots} />
        </div>
      </div>
    </>
  )
}
