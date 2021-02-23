export default function TodoFilter({changeFilter}){

    const filters = [...document.querySelectorAll(".filters li a")];

    filters.forEach(v => {
        v.addEventListener("click" , (e) => {
            e.preventDefault();
            const target = e.currentTarget;
            const selector = document.querySelector(".filters li a.selected")
            target.classList.add("selected")
            changeFilter(target.classList[0])
            selector.classList.remove("selected")
        })
    })

}