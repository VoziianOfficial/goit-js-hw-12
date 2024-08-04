import{a as w,S,i as n}from"./assets/vendor-b11e2a50.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const P="43901454-2f0f1ad212df2deb6dd93021b";let h=1,y=15;const m=async o=>{try{const t=new URLSearchParams({image_type:"photo",orientation:"horizontal",safesearch:!0,page:h,per_page:y});return(await w.get(`https://pixabay.com/api/?key=${P}&q=${o}&${t}`)).data}catch(t){throw console.error("Помилка при отриманні даних",t),t}};function p(o){h=o}function d(){return h}const C=new S(".card-link",{inlineStyles:!1,captionsData:"alt",captionDelay:250,disableScroll:!0}),g=(o,t)=>{const s=o.map(({largeImageURL:i,likes:e,comments:r,views:l,downloads:f,tags:b,webformatURL:v})=>`<li class="card">
                <a class="card-link" href="${i}">
                    <img  class="card-image" src="${v}" alt="${b}" /> 
                </a>
                <div class="main-content">
                    <ul class="card-list">
                        <li class="card-list-li">
                            <h3>
                                likes
                            </h3>
                            <p>${e}</p>
                        </li>
                        <li class="card-list-li">
                            <h3>
                                views
                            </h3>
                            <p>${l}</p>
                        </li>
                        <li class="card-list-li">
                            <h3>
                                comments
                            </h3>
                            <p>${r}</p>
                        </li>
                        <li class="card-list-li">
                            <h3>
                                downloads
                            </h3>
                            <p>${f}</p>
                        </li>
                    </ul>
                </div>
            </li>`).join("");t.insertAdjacentHTML("beforeend",s),C.refresh()},L=document.querySelector("form"),$=document.querySelector("input[data-search]"),c=document.querySelector(".loader-div"),u=document.querySelector(".list"),a=document.querySelector(".show-more");L.addEventListener("submit",async o=>{o.preventDefault(),c.style.display="flex",localStorage.removeItem("search");const t=$.value.trim();u.innerHTML="",p(1),a.style.visibility="hidden";try{const s=await m(t);localStorage.setItem("search",t);const i=s.hits,e=Math.ceil(s.totalHits/y);i.length!==0&&t!==""?(g(i,u),e>d()?a.style.visibility="visible":a.style.visibility="hidden"):n.show({title:"❌",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"white",backgroundColor:"#E25757",position:"topRight"})}catch(s){console.error("Error fetching images",s),a.style.visibility="hidden",n.show({title:"❌",message:"Sorry, check your internet connection!",messageColor:"white",backgroundColor:"#E25757",position:"topRight",timeout:5e3})}finally{c.style.display="none",o.target.reset()}});a.addEventListener("click",async()=>{c.style.display="flex";const o=localStorage.getItem("search");p(d()+1);try{const t=await m(o),s=t.hits,i=document.querySelector(".card"),e=Math.ceil(t.totalHits/y);g(s,u),e>d()?a.style.visibility="visible":(n.show({title:"❌",message:"We're sorry, but you've reached the end of search results.",messageColor:"white",backgroundColor:"#E25757",position:"topRight",timeout:5e3}),a.style.visibility="hidden");const r=Math.floor(i.getBoundingClientRect().height);scrollBy(0,r*2)}catch(t){console.error("Error fetching images",t),n.show({title:"❌",message:"Sorry, check your internet connection!",messageColor:"white",backgroundColor:"#E25757",position:"topRight",timeout:5e3})}finally{c.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map
