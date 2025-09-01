// 페이지 로드 시 초기 상태 설정
const topElement = document.getElementById('top');
const headerElement = document.getElementById('header');

// 스크롤 이벤트 감지
window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // 스크롤이 50px 이상일 때 top 영역을 숨기고 헤더를 top 위치로 이동
  if (scrollTop > 50) {
    topElement.classList.add('hide');

    // 헤더를 top 위치로 이동하고 높이 줄이기
    headerElement.style.top = '0';
    headerElement.style.padding = 'clamp(5px, 1vw, 10px) clamp(10px, 2.6vw, 50px) clamp(5px, 1vw, 10px) clamp(10px, 2.6vw, 50px)';
    // 헤더 배경색에 투명도 70% 적용
    headerElement.style.backgroundColor = 'var(--bg-color2)';

  } else {
    topElement.classList.remove('hide');

    // 헤더를 원래 위치로 복원하고 높이 복원
    headerElement.style.top = 'clamp(20px, 2.1vw, 40px)';
    headerElement.style.padding = 'clamp(20px, 2.6vw, 50px) clamp(10px, 2.6vw, 50px) clamp(10px, 2vw, 10px) clamp(10px, 2.6vw, 50px)';
    // 헤더 배경색을 원래대로 복원
    headerElement.style.backgroundColor = 'var(--bg-color)';
  }
});

// 카테고리별 이미지 데이터
const categoryImages = {
  '조명 / 캔들': [
    {
      main: 'https://github.com/love79hr/haru_e/blob/main/images/item_1.png?raw=true',
      thumbnails: [
        'https://github.com/love79hr/haru_e/blob/main/images/item_1.png?raw=true',
        'https://github.com/love79hr/haru_e/blob/main/images/item_2.png?raw=true',
        'https://github.com/love79hr/haru_e/blob/main/images/item_3.png?raw=true',
        'https://github.com/love79hr/haru_e/blob/main/images/item_4.png?raw=true'
      ]
    }
  ],
  '장식 데코': [
    {
      main: 'https://github.com/love79hr/haru_e/blob/main/images/item_5.png?raw=true',
      thumbnails: [
        'https://github.com/love79hr/haru_e/blob/main/images/item_5.png?raw=true',
        'https://github.com/love79hr/haru_e/blob/main/images/item_6.png?raw=true',
        'https://github.com/love79hr/haru_e/blob/main/images/item_7.png?raw=true',
        'https://github.com/love79hr/haru_e/blob/main/images/item_8.png?raw=true'
      ]
    }
  ],
  '패브릭 소품': [
    {
      main: 'https://github.com/love79hr/haru_e/blob/main/images/item_9.png?raw=true',
      thumbnails: [
        'https://github.com/love79hr/haru_e/blob/main/images/item_9.png?raw=true',
        'https://github.com/love79hr/haru_e/blob/main/images/item_10.png?raw=true',
        'https://github.com/love79hr/haru_e/blob/main/images/item_11.png?raw=true',
        'https://github.com/love79hr/haru_e/blob/main/images/item_12.png?raw=true'
      ]
    }
  ],
  '플라워 / 그린': [
    {
      main: 'https://github.com/love79hr/haru_e/blob/main/images/item_13.png?raw=true',
      thumbnails: [
        'https://github.com/love79hr/haru_e/blob/main/images/item_13.png?raw=true',
        'https://github.com/love79hr/haru_e/blob/main/images/item_14.png?raw=true',
        'https://github.com/love79hr/haru_e/blob/main/images/item_15.png?raw=true',
        'https://github.com/love79hr/haru_e/blob/main/images/item_16.png?raw=true'
      ]
    }
  ]
};

// Best Item 이미지 갤러리 기능
document.addEventListener('DOMContentLoaded', function() {
  const bItems = document.querySelectorAll('.b_item');
  const mainImage = document.querySelector('.main_image img');
  const tabButtons = document.querySelectorAll('.item_category ul li a');
  const tabItems = document.querySelectorAll('.item_category ul li');
  
  // 썸네일 클릭 이벤트
  bItems.forEach(item => {
    item.addEventListener('click', function() {
      // 모든 썸네일에서 active 클래스 제거
      bItems.forEach(bItem => bItem.classList.remove('active'));
      
      // 클릭된 썸네일에 active 클래스 추가
      this.classList.add('active');
      
      // 메인 이미지 변경
      const newImageSrc = this.getAttribute('data-image');
      if (mainImage && newImageSrc) {
        // 부드러운 전환 효과
        mainImage.style.opacity = '0';
        mainImage.style.transform = 'scale(1)';
        
        setTimeout(() => {
          mainImage.src = newImageSrc;
          mainImage.style.opacity = '1';
          mainImage.style.transform = 'scale(1.02)';
        }, 300);
      }
    });
  });
  
  // 탭 메뉴 클릭 이벤트
  tabButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // 모든 탭에서 active 클래스 제거
      tabItems.forEach(item => item.classList.remove('on'));
      
      // 클릭된 탭에 active 클래스 추가
      this.parentElement.classList.add('on');
      
      // 탭 텍스트에 따른 이미지 변경
      const tabText = this.querySelector('p').textContent;
      changeImagesByCategory(tabText);
    });
  });
  
  // 페이지 로드 시 첫 번째 탭 활성화
  if (tabItems.length > 0) {
    tabItems[0].classList.add('on');
    const firstTabText = tabButtons[0].querySelector('p').textContent;
    changeImagesByCategory(firstTabText);
  }
});

// 카테고리별 이미지 변경 함수
function changeImagesByCategory(category) {
  const mainImage = document.querySelector('.main_image img');
  const bItems = document.querySelectorAll('.b_item');
  
  if (categoryImages[category] && categoryImages[category][0]) {
    const images = categoryImages[category][0];
    
    // 메인 이미지 변경
    if (mainImage) {
      mainImage.style.opacity = '0';
      mainImage.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        mainImage.src = images.main;
        mainImage.style.opacity = '1';
        mainImage.style.transform = 'scale(1)';
      }, 200);
    }
    
    // 썸네일 이미지들 변경
    bItems.forEach((item, index) => {
      if (images.thumbnails[index]) {
        const img = item.querySelector('img');
        img.src = images.thumbnails[index];
        item.setAttribute('data-image', images.thumbnails[index]);
      }
    });
    
    // 첫 번째 썸네일을 활성화
    bItems.forEach(item => item.classList.remove('active'));
    bItems[0].classList.add('active');
  }
}

// 이벤트 바로가기 버튼 마우스 따라다니기 기능
document.addEventListener('DOMContentLoaded', function() {
  const eventCont = document.querySelector('.event_cont');
  const shortcutBtn = document.querySelector('.event_shortcut_btn');
  
  if (eventCont && shortcutBtn) {
    let isHovering = false;
    
    // 마우스가 event_cont 영역에 들어올 때
    eventCont.addEventListener('mouseenter', function() {
      isHovering = true;
      shortcutBtn.classList.add('show');
    });
    
    // 마우스가 event_cont 영역을 벗어날 때
    eventCont.addEventListener('mouseleave', function() {
      isHovering = false;
      shortcutBtn.classList.remove('show');
    });
    
    // 마우스 움직임 감지
    eventCont.addEventListener('mousemove', function(e) {
      if (isHovering) {
        // 마우스 위치 계산
        const rect = eventCont.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // 버튼 위치 업데이트 (마우스 커서 정중앙에 위치)
        const btnRect = shortcutBtn.getBoundingClientRect();
        const offsetX = -btnRect.width / 2; // 버튼 너비의 절반만큼 왼쪽으로
        const offsetY = -btnRect.height / 2; // 버튼 높이의 절반만큼 위로
        
        const newX = mouseX + offsetX;
        const newY = mouseY + offsetY;
        
        // 화면 경계 체크
        const maxX = rect.width - btnRect.width - 10;
        const maxY = rect.height - btnRect.height - 10;
        
        const finalX = Math.max(10, Math.min(newX, maxX));
        const finalY = Math.max(10, Math.min(newY, maxY));
        
        // 버튼 위치 설정
        shortcutBtn.style.left = finalX + 'px';
        shortcutBtn.style.top = finalY + 'px';
        shortcutBtn.style.transform = 'none'; // 기존 transform 제거
      }
    });
    
    // 버튼 클릭 이벤트
    shortcutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      // 여기에 이벤트 페이지로 이동하는 로직 추가
      alert('이벤트 페이지로 이동합니다!');
      // 예: window.location.href = '/event-page';
    });
  }
});

// Swiper 슬라이더 초기화
document.addEventListener('DOMContentLoaded', function() {
  console.log('Swiper 초기화 시작');
  
  // Swiper 요소가 존재하는지 확인
  const swiperElement = document.querySelector('.review_swiper');
  if (!swiperElement) {
    console.error('Swiper 요소를 찾을 수 없습니다');
    return;
  }
  
  // Swiper CDN이 로드되었는지 확인
  if (typeof Swiper === 'undefined') {
    console.error('Swiper 라이브러리가 로드되지 않았습니다');
    return;
  }
  
  try {
    const reviewSwiper = new Swiper('.review_swiper', {
      slidesPerView: 1,
      spaceBetween: 125,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      
    });
    
    console.log('Swiper 초기화 완료');
    
    // Swiper 인스턴스 확인
    if (reviewSwiper) {
             console.log('Swiper 인스턴스 생성됨');
       console.log('페이지네이션 요소:', reviewSwiper.pagination.el);
      
             // 페이지네이션 표시
       setTimeout(() => {
         const pagination = document.querySelector('.swiper-pagination');
         
         if (pagination) {
           pagination.style.display = 'block';
           pagination.style.opacity = '1';
           pagination.style.visibility = 'visible';
           console.log('페이지네이션 스타일 적용됨');
         }
       }, 300);
      
      
    }    
  } catch (error) {
    console.error('Swiper 초기화 오류:', error);
  }
});

