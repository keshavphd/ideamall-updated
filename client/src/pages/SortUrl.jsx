export const reduceUrl = (value)=>{
  return(
    value?.toString()?.replaceAll(" ", "-")?.replaceAll(",", "")
  )

}
    