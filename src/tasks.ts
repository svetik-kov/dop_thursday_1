export const getLostItem=<T>(arr: T[]):T=>{
  return arr[arr.length-1]
}


const res1=getLostItem(['12','13','14'])
const res1=getLostItem([12,13,14])
console.log(getLostItem(['12','13','14']))