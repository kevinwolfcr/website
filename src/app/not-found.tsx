export const metadata = {
  title: "404 | Page Not Found",
}

export default function NotFound() {
  return (
    <div className="relative z-20 flex-auto flex flex-col items-center justify-center">
      <h1 className="typography-9 font-bold">404</h1>
      <p className="typography-4 text-dimmed">This page could not be found.</p>
    </div>
  )
}
