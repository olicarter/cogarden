import Listing from '@/components/Listing'
import Map from '@/components/Map'
import Nav from '@/components/Nav'

export default async function Index() {
  return (
    <>
      <Map />
      <div className="flex flex-col gap-2 justify-between min-h-svh p-2">
        <Nav />
        <Listing />
      </div>
    </>
  )
}
