const elMovieList = selectElem("#movie__list")
const elMoviesTemplate = selectElem("#movie__template").content
const elPrev = selectElem("#prev")
const elNext = selectElem("#next")
const elSelect = selectElem("#select-type")
const elSearchInput = selectElem("#search-input")

let moviePage = 1
let searchValue = "hulk"
let selectValue = "movie"

const KEY  = "ec6105fc"
elSelect.addEventListener("change", () =>{
	selectValue = elSelect.value
	movies()
})
elSearchInput.addEventListener("change"  , () =>{
	searchValue = elSearchInput.value.trim()
	movies()
	elSearchInput.value = ''
})
function renderMovies(movesArray , element){
	element.innerHTML = null
	const movieFragment =  document.createDocumentFragment()
	movesArray.forEach((elem) =>{
		const cloneTemplate = elMoviesTemplate.cloneNode(true)
		selectElem("#movie__img", cloneTemplate ).src = elem.Poster
		selectElem('#movie__img',cloneTemplate).onerror = (evt) =>{
			evt.target.src = 'http://via.placeholder.com/100x150'
        }
		selectElem("#movie__title" , cloneTemplate ).textContent = elem.Title
		selectElem("#movie__type" , cloneTemplate ).textContent = elem.Type
		selectElem("#movie__year" , cloneTemplate ).textContent = elem.Year
		selectElem("#movie__imdbi" , cloneTemplate ).textContent = elem.imdbID
		movieFragment.appendChild(cloneTemplate)
	})
	element.appendChild(movieFragment)
	if(moviePage <= 1){
		elPrev.disabled = true
	}else{
		elPrev.disabled = false
	}
}
// fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=hulk`)
// .then(response => response.json())
// .then(json  => console.log(json))
async function 	movies(){
	try{
		
		elMovieList.innerHTML = `<img id="spinner__img" src="./Spinner-1s-200px.svg" alt="spinner"/>`
		const response = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${searchValue}&page=${moviePage}&type=${selectValue}`)
		const data = await response.json()   
		let total = Math.ceil((data.totalResults)/10)
		if(moviePage == total){
			elNext.disabled = true
		}else{
			elNext.disabled = false
		}
		if(data.Search){
			renderMovies(data.Search , elMovieList)
		}
	   }
	   catch(e){
		   console.log(e)
	   }
	
}



elPrev.addEventListener("click" , () =>{
	moviePage--
	movies()
})
elNext.addEventListener("click" , ()=>{
	moviePage++
	movies()
})
movies() 