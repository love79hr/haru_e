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

function script(){
  // 여기에 다른 스크립트 명령어를 작성하세요
};