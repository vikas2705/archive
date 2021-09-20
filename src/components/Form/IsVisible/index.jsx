
export default function IsVisible({ children, visible }) {
  if(!visible){
    return null;
  }
  return (
    <>
    {children}
    </>
  )
}