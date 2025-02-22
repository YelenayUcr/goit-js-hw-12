import{S as b,i as u,a as v}from"./assets/vendor-DEenWwFD.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();window.global||(window.global=window);const w="48307401-677547b5d41e0bab8fbb923eb",L="https://pixabay.com/api/",r=new URLSearchParams({key:w,q:"",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:1});let i=0;const P="Sorry, there are no images matching your search query. Please, try again!",m="We're sorry, but you've reached the end of search results",g=document.querySelector(".image-content"),d=document.querySelector(".loader"),p=document.querySelector(".load-more-button"),q=new b(".content-list-item a",{captionsData:"alt",captionDelay:250});function S(){let e=document.querySelector(".content-list-item");if(e){let o=e.getBoundingClientRect();window.scrollBy({top:o.height*2,behavior:"smooth"})}}function l(e,o){u.settings({timeout:5e3,transitionIn:"flipInX",transitionOut:"flipOutX"}),u.show({maxWidth:"350px",message:`${e}`,position:"topRight",backgroundColor:`${o}`})}function M(e){const o=e.hits.map(({webformatURL:n,largeImageURL:c,tags:t,likes:s,views:a,comments:h,downloads:y})=>`<li class="content-list-item">
            <div class="container-div">
                <a href="${c}">
                    <img src="${n}" alt="${t}" width="240" height="200">
                </a>
                <div class="content-bottom">
                    <div class="content-bottom-inner">
                        <p><b>Likes</b></p>
                        <p class="stats">${s}</p></div>
                    <div class="content-bottom-inner">
                        <p><b>Views</b></p>
                        <p class="stats">${a}</p></div>
                    <div class="content-bottom-inner">
                        <p><b>Comments</b></p>
                        <p class="stats">${h}</p></div>
                    <div class="content-bottom-inner">
                        <p><b>Downloads</b></p>
                        <p class="stats">${y}</p></div>
                </div> 
            </div> 
        </li>`).join("");g.insertAdjacentHTML("beforeend",o),q.refresh()}async function f(){try{const e=await v.get(L,{params:r});if(d.style.display="none",p.style.display="none",i=e.data.totalHits,i===0)l(P,"red");else{M(e.data);const o=Number(r.get("page")),n=Number(r.get("per_page"));o<Math.ceil(i/n)&&(p.style.display="block"),Math.ceil(i/n)===1&&l(m,"aqua")}}catch(e){d.style.display="none",l(e.message,"purple")}}const $=document.querySelector(".search-form"),O=document.querySelector(".search-input");$.addEventListener("submit",e=>{e.preventDefault(),r.set("q",O.value),r.set("page","1"),g.innerHTML="",d.style.display="flex",f()});p.addEventListener("click",async()=>{let e=Number(r.get("page")),o=r.get("per_page");r.set("page",e+1),await f(),S(),e+1>=Math.ceil(i/o)&&(l(m,"aqua"),p.style.display="none")});
//# sourceMappingURL=index.js.map
