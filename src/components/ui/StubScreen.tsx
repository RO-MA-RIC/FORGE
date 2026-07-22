export function StubScreen({ title, message }: { title: string; message: string }) {
  return (
    <div className="app-content">
      <div className="stub-screen">
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  )
}
