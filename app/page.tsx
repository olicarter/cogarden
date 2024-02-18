import Listing from '@/components/Listing'
import Map from '@/components/Map'
import Nav from '@/components/Nav'
import { createClient } from '@/utils/supabase/server'

export default async function Index({
  searchParams,
}: {
  searchParams: { plot: string }
}) {
  const supabase = createClient()

  const { data: nearbyPlots } = await supabase.rpc('nearby_plots', {
    lat: 59.445,
    lng: 24.68701,
  })

  let plot = nearbyPlots[0]

  if (searchParams.plot) {
    const { data } = await supabase.rpc('get_plot_with_location', {
      plot_id: searchParams.plot,
    })
    plot = data[0]
  }

  return (
    <>
      <Map plot={plot} plots={nearbyPlots} />
      <div className="flex flex-col gap-2 justify-between min-h-svh p-2">
        <Nav />
        <Listing plot={plot} />
      </div>
    </>
  )
}
