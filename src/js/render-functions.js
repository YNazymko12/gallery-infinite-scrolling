export const createGalleryCard = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `
        <li class='gallery-card'>
            <a href="${largeImageURL}">
                <img class="gallery-img" src="${webformatURL}" alt="${tags} loading='lazy" />
            </a>
            <div class="gallery-info">
                <p class="gallery-info-item">
                    <b>Likes</b>${likes}
                </p>
                    <p class="gallery-info-item">
                <b>Views</b>${views}
                </p>
                <p class="gallery-info-item">
                    <b>Comments</b>${comments}
                </p>
                <p class="gallery-info-item">
                    <b>Downloads</b>${downloads}
                </p>
            </div>
          </li>`;
};
