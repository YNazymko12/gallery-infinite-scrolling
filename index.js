import{a as g,S as b,i as v}from"./assets/vendor-zdJlF1dY.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(r){if(r.ep)return;r.ep=!0;const t=a(r);fetch(r.href,t)}})();const L="40905423-24d24966a8b04fca12252a818";g.defaults.baseURL="https://pixabay.com/api/";const f=(o,e,a)=>{const s={params:{key:L,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:a}};return g.get("",s)},m=({webformatURL:o,largeImageURL:e,tags:a,likes:s,views:r,comments:t,downloads:n})=>`
        <li class='gallery-card'>
            <a href="${e}">
                <img class="gallery-img" src="${o}" alt="${a} loading='lazy" />
            </a>
            <div class="gallery-info">
                <p class="gallery-info-item">
                    <b>Likes</b>${s}
                </p>
                    <p class="gallery-info-item">
                <b>Views</b>${r}
                </p>
                <p class="gallery-info-item">
                    <b>Comments</b>${t}
                </p>
                <p class="gallery-info-item">
                    <b>Downloads</b>${n}
                </p>
            </div>
          </li>`,c=document.querySelector(".js-search-form"),u=document.querySelector(".js-gallery"),x=document.querySelector(".loader"),S=document.querySelector(".js-observerd-element");let i=1;const y=15;let l="",h=new b(".js-gallery a");const O={root:null,rootMargin:"0px 0px 400px 0px",threshold:1},P=async o=>{if(console.log(o),o[0].isIntersecting)try{i+=1;const a=(await f(l,i,y)).data.hits.map(s=>m(s)).join("");u.insertAdjacentHTML("beforeend",a),h.refresh()}catch(e){console.log(e),d(`${e}`)}},$=new IntersectionObserver(P,O),p=()=>{x.classList.toggle("is-hidden")},d=o=>{v.error({message:o,position:"topRight",maxWidth:400})},q=async o=>{try{if(o.preventDefault(),l=c.elements.user_query.value.trim(),l==="")return;u.innerHTML="",p(),i=1;const e=await f(l,i,y);if(e.data.hits.length===0){d("Sorry, there are no images matching your search query. Please try again!");return}const a=e.data.hits.map(s=>m(s)).join("");u.innerHTML=a,$.observe(S),h.refresh(),c.reset()}catch(e){console.log(e),d(`${e}`)}finally{p()}};c.addEventListener("submit",q);
//# sourceMappingURL=index.js.map
