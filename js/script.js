/**
 * ========================================
 * 모든 페이지 공통 적용 JavaScript
 * ========================================
 * 
 * 이 파일은 웹사이트의 모든 페이지에서 공통으로 사용되는 JavaScript 기능들을 포함합니다.
 * 주요 기능:
 * - 로그인/검색/장바구니 팝업 관리
 * - 메인 페이지 상품 갤러리 및 탭 기능
 * - Shop 페이지 전용 네비게이션 및 상품 관리
 * - Swiper 슬라이더 초기화
 * - 반응형 UI 인터랙션
 */

// ========================================
// 로그인 팝업창 관련 기능
// ========================================

/**
 * 로그인 팝업창 관련 DOM 요소들을 선택 
 */
const loginBtn = document.querySelector('.login_btn');      // 로그인 버튼 (팝업을 여는 트리거)
const loginPopup = document.querySelector('.login_popup');  // 로그인 팝업창 (팝업을 표시하는 컨테이너)
const loginCloseBtn = loginPopup?.querySelector('.close_btn'); // 로그인 팝업창 닫기 버튼

/**
 * 로그인 팝업창 열기 기능
 * 로그인 버튼 클릭 시 팝업창을 표시하고 배경 스크롤을 방지합니다.
 */
if (loginBtn) {
  loginBtn.addEventListener('click', function () { // 로그인 버튼 클릭 시 팝업창을 표시하고 배경 스크롤을 방지
    loginPopup.classList.add('active'); // 팝업창 표시
    document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
  });
}

/**
 * 로그인 팝업창 닫기 기능 (닫기 버튼 클릭)
 * 닫기 버튼 클릭 시 팝업창을 숨기고 배경 스크롤을 복원합니다.
 */
if (loginCloseBtn) { // 닫기 버튼 클릭 시 팝업창을 숨기고 배경 스크롤을 복원
  loginCloseBtn.addEventListener('click', function () { // 닫기 버튼 클릭 시 팝업창을 숨기고 배경 스크롤을 복원
    loginPopup.classList.remove('active'); // 팝업창 숨김
    document.body.style.overflow = ''; // 배경 스크롤 복원 
  });
}

/**
 * 로그인 팝업창 외부 클릭 시 닫기 기능
 * 팝업창 외부 영역을 클릭하면 팝업창이 자동으로 닫힙니다.
 * @param {Event} e - 클릭 이벤트 객체
 */
if (loginPopup) {
  loginPopup.addEventListener('click', function (e) {
    // 클릭된 요소가 팝업창 자체인 경우에만 닫기 (내부 요소 클릭은 제외)
    if (e.target === loginPopup) { // 클릭된 요소가 팝업창 자체인 경우에만 닫기 (내부 요소 클릭은 제외)
      loginPopup.classList.remove('active'); // 팝업창 숨김
      document.body.style.overflow = ''; // 배경 스크롤 복원
    }
  });
}

// ========================================
// 메인 페이지 카테고리별 이미지 데이터
// ========================================

/**
 * 메인 페이지에서 사용되는 카테고리별 상품 이미지 데이터
 * 각 카테고리마다 메인 이미지와 썸네일 이미지들을 포함합니다.
 * 
 * @type {Object} categoryImages - 카테고리별 이미지 데이터 객체
 * @property {Array} '조명 / 캔들' - 조명 및 캔들 카테고리 이미지들
 * @property {Array} '장식 데코' - 장식 데코 카테고리 이미지들  
 * @property {Array} '패브릭 소품' - 패브릭 소품 카테고리 이미지들
 * @property {Array} '플라워 / 그린' - 플라워 및 그린 카테고리 이미지들
 */
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

// ========================================
// Best Item 이미지 갤러리 기능
// ========================================

/**
 * DOM이 완전히 로드된 후 실행되는 메인 페이지 갤러리 초기화 함수
 * 썸네일 클릭 이벤트와 탭 메뉴 기능을 설정합니다.
 */
document.addEventListener('DOMContentLoaded', function () {
  // 갤러리 관련 DOM 요소들 선택
  const bItems = document.querySelectorAll('.b_item');                    // 썸네일 아이템들
  const mainImage = document.querySelector('.main_image img');            // 메인 이미지 요소
  const tabButtons = document.querySelectorAll('.item_category ul li a'); // 탭 버튼들
  const tabItems = document.querySelectorAll('.item_category ul li');     // 탭 아이템들

  /**
   * 썸네일 클릭 이벤트 핸들러
   * 썸네일을 클릭하면 해당 이미지가 메인 이미지로 변경됩니다.
   */
  bItems.forEach(item => {
    item.addEventListener('click', function () {
      // 모든 썸네일에서 active 클래스 제거 (선택 상태 초기화)
      bItems.forEach(bItem => bItem.classList.remove('active'));

      // 클릭된 썸네일에 active 클래스 추가 (선택 상태 표시)
      this.classList.add('active');

      // 메인 이미지 변경 처리
      const newImageSrc = this.getAttribute('data-image');
      if (mainImage && newImageSrc) {
        // 부드러운 전환 효과를 위한 페이드 아웃
        mainImage.style.opacity = '0';
        mainImage.style.transform = 'scale(1)';

        // 200ms 후 새 이미지로 교체하고 페이드 인
        setTimeout(() => {
          mainImage.src = newImageSrc;
          mainImage.style.opacity = '1';
          mainImage.style.transform = 'scale(1.02)'; // 살짝 확대 효과
        }, 200);
      }
    });
  });

  /**
   * 탭 메뉴 클릭 이벤트 핸들러
   * 탭을 클릭하면 해당 카테고리의 이미지들로 변경됩니다.
   */
  tabButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault(); // 기본 링크 동작 방지

      // 모든 탭에서 active 클래스 제거 (선택 상태 초기화)
      tabItems.forEach(item => item.classList.remove('on'));

      // 클릭된 탭에 active 클래스 추가 (선택 상태 표시)
      this.parentElement.classList.add('on');

      // 탭 텍스트에 따른 이미지 변경 실행
      const tabText = this.querySelector('p').textContent;
      changeImagesByCategory(tabText);
    });
  });

  /**
   * 페이지 로드 시 첫 번째 탭을 기본으로 활성화
   * 사용자가 페이지에 처음 진입했을 때 첫 번째 카테고리가 표시되도록 합니다.
   */
  if (tabItems.length > 0) {
    tabItems[0].classList.add('on');
    const firstTabText = tabButtons[0].querySelector('p').textContent;
    changeImagesByCategory(firstTabText);
  }
});

/**
 * 카테고리별 이미지 변경 함수
 * 선택된 카테고리에 따라 메인 이미지와 썸네일들을 업데이트합니다.
 * 
 * @param {string} category - 변경할 카테고리명 ('조명 / 캔들', '장식 데코', '패브릭 소품', '플라워 / 그린')
 */
function changeImagesByCategory(category) {
  const mainImage = document.querySelector('.main_image img');
  const bItems = document.querySelectorAll('.b_item');

  // 해당 카테고리의 이미지 데이터가 존재하는지 확인
  if (categoryImages[category] && categoryImages[category][0]) {
    const images = categoryImages[category][0];

    /**
     * 메인 이미지 변경 처리
     * 부드러운 전환 효과를 위해 페이드 아웃 후 새 이미지로 교체
     */
    if (mainImage) {
      mainImage.style.opacity = '0';
      mainImage.style.transform = 'scale(0.95)';

      setTimeout(() => {
        mainImage.src = images.main;
        mainImage.style.opacity = '1';
        mainImage.style.transform = 'scale(1)';
      }, 200);
    }

    /**
     * 썸네일 이미지들 변경 처리
     * 각 썸네일의 이미지 소스와 data-image 속성을 업데이트
     */
    bItems.forEach((item, index) => {
      if (images.thumbnails[index]) {
        const img = item.querySelector('img');
        img.src = images.thumbnails[index];
        item.setAttribute('data-image', images.thumbnails[index]);
      }
    });

    /**
     * 첫 번째 썸네일을 활성화
     * 카테고리 변경 시 첫 번째 썸네일이 선택된 상태로 표시
     */
    bItems.forEach(item => item.classList.remove('active'));
    bItems[0].classList.add('active');
  }
}

// ========================================
// 이벤트 바로가기 버튼 마우스 따라다니기 기능
// ========================================

/**
 * 이벤트 섹션에서 마우스 커서를 따라다니는 바로가기 버튼 기능
 * 마우스가 이벤트 영역에 들어오면 버튼이 나타나고, 마우스를 따라 움직입니다.
 */
document.addEventListener('DOMContentLoaded', function () {
  const eventCont = document.querySelector('.event_cont');        // 이벤트 컨테이너 영역
  const shortcutBtn = document.querySelector('.event_shortcut_btn'); // 바로가기 버튼

  if (eventCont && shortcutBtn) {
    // 마우스 상태 추적을 위한 변수들
    let isHovering = false;        // 이벤트 영역에 마우스가 있는지 여부
    let isButtonHovering = false;  // 버튼에 마우스가 있는지 여부

    /**
     * 이벤트 영역에 마우스 진입 시 버튼 표시
     * 버튼에 마우스가 없는 상태에서만 버튼을 보여줍니다.
     */
    eventCont.addEventListener('mouseenter', function () {  // 이벤트 영역에 마우스 진입 시 버튼 표시
      isHovering = true; // 이벤트 영역에 마우스가 있음
      if (!isButtonHovering) { // 버튼에 마우스가 없는 상태에서만 버튼을 보여줌
        shortcutBtn.classList.add('show'); // 버튼 표시
      }
    });

    /**
     * 이벤트 영역에서 마우스 벗어날 시 버튼 숨김
     * 버튼에 마우스가 없는 상태에서만 버튼을 숨깁니다.
     */
    eventCont.addEventListener('mouseleave', function () {  // 이벤트 영역에서 마우스 벗어날 시 버튼 숨김
      isHovering = false; // 이벤트 영역에 마우스가 없음
      if (!isButtonHovering) { // 버튼에 마우스가 없는 상태에서만 버튼을 숨김
        shortcutBtn.classList.remove('show'); // 버튼 숨김
      }
    });

    /**
     * 버튼에 마우스 진입 시 버튼 유지
     * 사용자가 버튼을 클릭하려고 할 때 버튼이 사라지지 않도록 합니다.
     */
    shortcutBtn.addEventListener('mouseenter', function () {  // 버튼에 마우스 진입 시 버튼 유지
      isButtonHovering = true; // 버튼에 마우스가 있음
      shortcutBtn.classList.add('show'); // 버튼 표시
    });

    /**
     * 버튼에서 마우스 벗어날 시 상태 확인
     * 이벤트 영역에도 마우스가 없다면 버튼을 숨깁니다.
     */
    shortcutBtn.addEventListener('mouseleave', function () {  // 버튼에서 마우스 벗어날 시 상태 확인
      isButtonHovering = false; // 버튼에 마우스가 없음
      if (!isHovering) { // 이벤트 영역에 마우스가 없다면 버튼을 숨김
        shortcutBtn.classList.remove('show'); // 버튼 숨김
      }
    });

    /**
     * 마우스 움직임 감지 및 버튼 위치 업데이트
     * 마우스가 이벤트 영역에서 움직일 때 버튼이 마우스를 따라 움직입니다.
     * @param {MouseEvent} e - 마우스 이벤트 객체
     */
    eventCont.addEventListener('mousemove', function (e) {  // 마우스 움직임 감지 및 버튼 위치 업데이트
      if (isHovering && !isButtonHovering) { // 이벤트 영역에 마우스가 있고 버튼에 마우스가 없는 상태에서만 버튼을 움직임
        // 이벤트 영역 내에서의 마우스 상대 위치 계산
        const rect = eventCont.getBoundingClientRect(); // 이벤트 영역의 크기와 위치 정보를 가져옴
        const mouseX = e.clientX - rect.left; // 마우스 커서의 X 좌표를 이벤트 영역 내에서의 상대 위치로 변환
        const mouseY = e.clientY - rect.top; // 마우스 커서의 Y 좌표를 이벤트 영역 내에서의 상대 위치로 변환

        // 버튼 위치 업데이트 (마우스 커서 정중앙에 위치하도록 오프셋 계산)
        const btnRect = shortcutBtn.getBoundingClientRect(); // 버튼의 크기와 위치 정보를 가져옴
        const offsetX = -btnRect.width / 2;  // 버튼 너비의 절반만큼 왼쪽으로
        const offsetY = -btnRect.height / 2; // 버튼 높이의 절반만큼 위로

        const newX = mouseX + offsetX; // 버튼의 새로운 X 좌표를 계산
        const newY = mouseY + offsetY; // 버튼의 새로운 Y 좌표를 계산

        // 화면 경계 체크 (버튼이 이벤트 영역을 벗어나지 않도록 제한)
        const maxX = rect.width - btnRect.width - 10;  // 오른쪽 경계 (10px 여백)
        const maxY = rect.height - btnRect.height - 10; // 아래쪽 경계 (10px 여백)

        const finalX = Math.max(10, Math.min(newX, maxX)); // 최소 10px, 최대 maxX
        const finalY = Math.max(10, Math.min(newY, maxY)); // 최소 10px, 최대 maxY

        // 계산된 위치로 버튼 이동
        shortcutBtn.style.left = finalX + 'px'; // 버튼의 새로운 X 좌표를 설정
        shortcutBtn.style.top = finalY + 'px'; // 버튼의 새로운 Y 좌표를 설정
        shortcutBtn.style.transform = 'none'; // 기존 transform 속성 제거
      }
    });

    /**
     * 버튼 클릭 이벤트 핸들러
     * 버튼을 클릭하면 이벤트 페이지로 이동합니다.
     * @param {Event} e - 클릭 이벤트 객체
     */
    shortcutBtn.addEventListener('click', function (e) {  // 버튼 클릭 이벤트 핸들러
      e.preventDefault(); // 기본 동작 방지
      // TODO: 실제 이벤트 페이지로 이동하는 로직 구현
      // alert('이벤트 페이지로 이동합니다!'); // 이벤트 페이지로 이동합니다!
      window.location.href = './event.html';
    });
  }
});

// ========================================
// Swiper 슬라이더 초기화
// ========================================

/**
 * Swiper 슬라이더 초기화 함수
 * 리뷰 섹션의 이미지 슬라이더를 설정하고 자동 재생 기능을 활성화합니다.
 * Swiper 라이브러리가 로드되지 않은 경우 오류를 출력하고 실행을 중단합니다.
 */
document.addEventListener('DOMContentLoaded', function () { // Swiper 슬라이더 초기화 함수
  // index.html 페이지에서만 실행
  if (window.location.pathname.includes('index.html')) {
    const swiperElement = document.querySelector('.review_swiper'); // Swiper 요소
    if (swiperElement) { // Swiper 요소가 있는 페이지에서만 실행 (리뷰 페이지 등)
      console.log('Swiper 초기화 시작'); // Swiper 초기화 시작

      // Swiper CDN 라이브러리가 로드되었는지 확인
      if (typeof Swiper === 'undefined') { // Swiper 라이브러리가 로드되지 않았다면 오류를 출력하고 실행을 중단
        console.error('Swiper 라이브러리가 로드되지 않았습니다'); // Swiper 라이브러리가 로드되지 않았다면 오류를 출력하고 실행을 중단
        return; // 실행을 중단
      }

      try { // Swiper 인스턴스 생성 및 설정
        /**
         * Swiper 인스턴스 생성 및 설정
         * 리뷰 슬라이더의 동작 방식을 정의합니다.
         */
        const reviewSwiper = new Swiper('.review_swiper', { // Swiper 인스턴스 생성 및 설정
          slidesPerView: 1,        // 한 번에 보여줄 슬라이드 개수
          spaceBetween: 125,       // 슬라이드 간 간격 (px)
          centeredSlides: true,    // 슬라이드를 중앙 정렬
          loop: true,              // 무한 루프 활성화

          // 자동 재생 설정
          autoplay: {
            delay: 5000,                    // 5초마다 슬라이드 변경
            disableOnInteraction: false,    // 사용자 상호작용 후에도 자동재생 유지
          },

          // 페이지네이션 (하단 점 표시) 설정
          pagination: {
            el: '.swiper-pagination',       // 페이지네이션 컨테이너
            clickable: true,                // 블릿 클릭으로 슬라이드 이동 가능
            type: 'bullets',                // 블릿 형태의 페이지네이션
            renderBullet: function (index, className) { // 블릿 형태의 페이지네이션
              return '<span class="' + className + '"></span>'; // 블릿 형태의 페이지네이션
            },
          },

          // 네비게이션 버튼 (이전/다음) 설정
          navigation: {
            nextEl: '.swiper-button-next',  // 다음 버튼 요소
            prevEl: '.swiper-button-prev',  // 이전 버튼 요소
          },
        });

        console.log('Swiper 초기화 완료');

        /**
         * Swiper 인스턴스 생성 확인 및 페이지네이션 표시
         * 초기화가 성공적으로 완료되었는지 확인하고 페이지네이션을 표시합니다.
         */
        if (reviewSwiper) { // Swiper 인스턴스 생성되었는지 확인
          console.log('Swiper 인스턴스 생성됨'); // Swiper 인스턴스 생성됨
          console.log('페이지네이션 요소:', reviewSwiper.pagination.el); // 페이지네이션 요소

          /**
           * 페이지네이션 표시 처리
           * 300ms 지연 후 페이지네이션을 시각적으로 표시합니다.
           */
          setTimeout(() => { // 300ms 지연 후 페이지네이션을 시각적으로 표시
            const pagination = document.querySelector('.swiper-pagination'); // 페이지네이션 요소

            if (pagination) { // 페이지네이션 요소가 있는지 확인
              pagination.style.display = 'block'; // 페이지네이션 표시
              pagination.style.opacity = '1'; // 페이지네이션 표시
              pagination.style.visibility = 'visible'; // 페이지네이션 표시
              console.log('페이지네이션 스타일 적용됨');
            }
          }, 300);
        }
      } catch (error) { // Swiper 초기화 오류
        console.error('Swiper 초기화 오류:', error);
      }
    } else {
      console.log('Swiper 요소를 찾을 수 없습니다 - 이 페이지에서는 Swiper를 사용하지 않습니다.');
    }
  }

});



// ========================================
// 모든 페이지 공통 적용 JavaScript 기능
// ========================================

/**
 * DOM이 완전히 로드된 후 실행되는 공통 기능 초기화
 * 메뉴, 검색, 장바구니 등 모든 페이지에서 사용되는 기능들을 설정합니다.
 */
document.addEventListener('DOMContentLoaded', function () { // DOM이 완전히 로드된 후 실행되는 공통 기능 초기화
  // ========================================
  // 햄버거 메뉴 (bar_menu) 토글 기능
  // ========================================

  /**
   * 햄버거 메뉴 관련 DOM 요소들 선택
   */
  const barMenu = document.querySelector('.bar_menu a');        // 햄버거 메뉴 버튼
  const subMenu = document.querySelector('.bar_menu .sub_menu'); // 서브메뉴 컨테이너

  if (barMenu && subMenu) {
    /**
     * 햄버거 메뉴 클릭 이벤트 핸들러
     * 메뉴 버튼을 클릭하면 서브메뉴가 토글됩니다.
     * @param {Event} e - 클릭 이벤트 객체
     */
    barMenu.addEventListener('click', function (e) { // 햄버거 메뉴 클릭 이벤트 핸들러
      e.preventDefault(); // 기본 링크 동작 방지
      subMenu.classList.toggle('active'); // active 클래스 토글
    });

    /**
     * 메뉴 외부 클릭 시 메뉴 닫기 기능
     * 메뉴 영역 외부를 클릭하면 서브메뉴가 자동으로 닫힙니다.
     * @param {Event} e - 클릭 이벤트 객체
     */
    document.addEventListener('click', function (e) { // 메뉴 외부 클릭 시 메뉴 닫기 기능
      if (!barMenu.contains(e.target) && !subMenu.contains(e.target)) { // 클릭된 요소가 햄버거 메뉴 또는 서브메뉴에 포함되지 않는 경우에만 메뉴를 닫음
        subMenu.classList.remove('active'); // active 클래스 제거
      }
    });

    /**
     * ESC 키로 메뉴 닫기 기능
     * ESC 키를 누르면 서브메뉴가 닫힙니다.
     * @param {KeyboardEvent} e - 키보드 이벤트 객체
     */
    document.addEventListener('keydown', function (e) { // ESC 키로 메뉴 닫기 기능
      if (e.key === 'Escape') { // ESC 키를 누르면 서브메뉴가 닫힘
        subMenu.classList.remove('active'); // active 클래스 제거
      }
    });
  }

  // ========================================
  // 검색 팝업창 기능
  // ========================================

  /**
   * 검색 팝업창 관련 DOM 요소들 선택
   */
  const searchBtn = document.querySelector('.search_btn');        // 검색 버튼
  const searchPopup = document.querySelector('.search_popup');    // 검색 팝업창
  const closeBtn = document.querySelector('.close_btn');          // 닫기 버튼
  const searchInput = document.querySelector('.search_input');    // 검색 입력창
  const searchSubmit = document.querySelector('.search_submit');  // 검색 제출 버튼

  if (searchBtn && searchPopup) { // 검색 버튼과 검색 팝업창이 있는지 확인
    /**
     * 검색 버튼 클릭 시 팝업 열기 기능
     * 검색 버튼을 클릭하면 팝업창이 열리고 입력창에 포커스가 이동합니다.
     * @param {Event} e - 클릭 이벤트 객체
     */
    searchBtn.addEventListener('click', function (e) { // 검색 버튼 클릭 이벤트 핸들러
      e.preventDefault(); // 기본 동작 방지
      searchPopup.classList.add('active'); // 팝업창 표시

      // 팝업이 열린 후 검색 입력창에 포커스 (애니메이션 완료 후)
      setTimeout(() => { // 300ms 지연 후 검색 입력창에 포커스
        searchInput.focus(); // 검색 입력창에 포커스
      }, 300);
    });

    /**
     * 닫기 버튼 클릭 시 팝업 닫기 기능
     * 닫기 버튼을 클릭하면 팝업창이 닫히고 입력창이 초기화됩니다.
     */
    if (closeBtn) {
      closeBtn.addEventListener('click', function () { // 닫기 버튼 클릭 이벤트 핸들러
        searchPopup.classList.remove('active'); // 팝업창 숨김
        searchInput.value = ''; // 입력창 초기화
      });
    }

    /**
     * 검색 제출 버튼 클릭 시 검색 실행
     * 검색어가 입력된 경우 검색을 실행하고 팝업창을 닫습니다.
     */
    if (searchSubmit) {
      searchSubmit.addEventListener('click', function () { // 검색 제출 버튼 클릭 이벤트 핸들러
        const searchTerm = searchInput.value.trim(); // 공백 제거된 검색어

        if (searchTerm) {
          // TODO: 실제 검색 로직 구현
          console.log('검색어:', searchTerm);
          alert(`"${searchTerm}" 검색 결과를 보여드립니다!`);
          searchPopup.classList.remove('active'); // 팝업창 닫기
          searchInput.value = ''; // 입력창 초기화
        }
      });
    }

    /**
     * 팝업 외부 클릭 시 팝업 닫기 기능
     * 팝업창 외부 영역을 클릭하면 팝업창이 자동으로 닫힙니다.
     * @param {Event} e - 클릭 이벤트 객체
     */
    searchPopup.addEventListener('click', function (e) { // 팝업 외부 클릭 시 팝업 닫기 기능
      if (e.target === searchPopup) { // 클릭된 요소가 팝업창 자체인 경우에만 닫기
        searchPopup.classList.remove('active'); // 팝업창 닫기
        searchInput.value = ''; // 입력창 초기화
      }
    });

    /**
     * ESC 키로 팝업 닫기 기능
     * ESC 키를 누르면 검색 팝업창이 닫힙니다.
     * @param {KeyboardEvent} e - 키보드 이벤트 객체
     */
    document.addEventListener('keydown', function (e) { // ESC 키로 팝업 닫기 기능
      if (e.key === 'Escape' && searchPopup.classList.contains('active')) { // ESC 키를 누르면 팝업창이 닫힘
        searchPopup.classList.remove('active'); // 팝업창 닫기
        searchInput.value = ''; // 입력창 초기화
      }
    });

    /**
     * Enter 키로 검색 실행 기능
     * 검색 입력창에서 Enter 키를 누르면 검색이 실행됩니다.
     * @param {KeyboardEvent} e - 키보드 이벤트 객체
     */
    if (searchInput) { // 검색 입력창이 있는지 확인
      searchInput.addEventListener('keypress', function (e) { // 검색 입력창에서 Enter 키를 누르면 검색 실행 기능
        if (e.key === 'Enter') { // Enter 키를 누르면 검색 실행
          const searchTerm = searchInput.value.trim(); // 공백 제거된 검색어

          if (searchTerm) { // 검색어가 있는지 확인
            // TODO: 실제 검색 로직 구현
            console.log('검색어:', searchTerm); // 검색어 출력
            alert(`"${searchTerm}" 검색 결과를 보여드립니다!`); // 검색 결과 알림
            searchPopup.classList.remove('active'); // 팝업창 닫기
            searchInput.value = ''; // 입력창 초기화
          }
        }
      });
    }
  }
});


// ========================================
// 장바구니 팝업창 기능
// ========================================

/**
 * 장바구니 팝업창 관련 DOM 요소들 선택
 */
const cartBtn = document.querySelector('.cart_btn');          // 장바구니 버튼
const cartPopup = document.querySelector('.cart_popup');      // 장바구니 팝업창
const cartCloseBtn = cartPopup?.querySelector('.close_btn');  // 장바구니 닫기 버튼

/**
 * 장바구니 팝업창 열기 기능
 * 장바구니 버튼을 클릭하면 팝업창이 열리고 배경 스크롤이 방지됩니다.
 */
if (cartBtn) {
  cartBtn.addEventListener('click', function () { // 장바구니 버튼 클릭 이벤트 핸들러
    cartPopup.classList.add('active'); // 팝업창 표시
    document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
  });
}

/**
 * 장바구니 팝업창 닫기 기능 (닫기 버튼 클릭)
 * 닫기 버튼을 클릭하면 팝업창이 닫히고 배경 스크롤이 복원됩니다.
 */
if (cartCloseBtn) { // 장바구니 닫기 버튼이 있는지 확인
  cartCloseBtn.addEventListener('click', function () { // 장바구니 닫기 버튼 클릭 이벤트 핸들러
    cartPopup.classList.remove('active'); // 팝업창 숨김
    document.body.style.overflow = ''; // 배경 스크롤 복원
  });
}

/**
 * 장바구니 팝업창 외부 클릭 시 닫기 기능
 * 팝업창 외부 영역을 클릭하면 팝업창이 자동으로 닫힙니다.
 * @param {Event} e - 클릭 이벤트 객체
 */
if (cartPopup) { // 장바구니 팝업창이 있는지 확인
  cartPopup.addEventListener('click', function (e) { // 장바구니 팝업창 외부 클릭 시 닫기 기능
    // 클릭된 요소가 팝업창 자체인 경우에만 닫기 (내부 요소 클릭은 제외)
    if (e.target === cartPopup) { // 클릭된 요소가 팝업창 자체인 경우에만 닫기 (내부 요소 클릭은 제외)
      cartPopup.classList.remove('active'); // 팝업창 숨김
      document.body.style.overflow = ''; // 배경 스크롤 복원
    }
  });
}

// ========================================
// 장바구니 상품 관리 기능 구현
// ========================================

/**
 * 장바구니 내부 상품 관리 기능 초기화
 * 수량 조절, 상품 삭제, 장바구니 비우기, 주문하기 등의 기능을 설정합니다.
 */
document.addEventListener('DOMContentLoaded', function () { // 장바구니 내부 기능 관련 DOM 요소들을 선택
  // 장바구니 내부 기능 관련 DOM 요소들을 선택
  const qtyBtns = document.querySelectorAll('.qty_btn');           // 수량 증가/감소 버튼들
  const removeBtns = document.querySelectorAll('.remove_btn');    // 상품 삭제 버튼들
  const cartClearBtn = document.querySelector('.cart_clear');     // 장바구니 비우기 버튼
  const cartCheckoutBtn = document.querySelector('.cart_checkout'); // 주문하기 버튼

  // ========================================
  // 수량 조절 기능 (증가/감소)
  // ========================================

  /**
   * 수량 조절 버튼 이벤트 핸들러
   * + 버튼을 클릭하면 수량이 증가하고, - 버튼을 클릭하면 수량이 감소합니다.
   * 최소 수량은 1개로 제한됩니다.
   */
  qtyBtns.forEach(btn => { // 수량 증가/감소 버튼들 반복문 처리
    btn.addEventListener('click', function () { // 수량 증가/감소 버튼 클릭 이벤트 핸들러
      // 현재 상품의 수량 표시 요소를 찾기
      const quantitySpan = this.parentNode.querySelector('.quantity'); // 수량 표시 요소
      let quantity = parseInt(quantitySpan.textContent); // 수량 표시 요소의 텍스트 값을 정수로 변환

      // 버튼 클래스에 따라 수량 증가 또는 감소 처리
      if (this.classList.contains('plus')) { // + 버튼을 클릭하면 수량 증가
        quantity++; // 수량 증가
      } else if (this.classList.contains('minus') && quantity > 1) { // - 버튼을 클릭하면 수량 감소 (최소 1개 유지)
        quantity--; // 수량 감소 (최소 1개 유지)
      }

      // 수량 업데이트 및 총계 재계산
      quantitySpan.textContent = quantity; // 수량 표시 요소의 텍스트 값을 수량으로 업데이트
      updateCartSummary(); // 장바구니 요약 정보 업데이트
    });
  });

  // ========================================
  // 개별 상품 삭제 기능
  // ========================================

  /**
   * 개별 상품 삭제 버튼 이벤트 핸들러
   * 삭제 버튼을 클릭하면 해당 상품이 장바구니에서 제거됩니다.
   */
  removeBtns.forEach(btn => { // 개별 상품 삭제 버튼들 반복문 처리
    btn.addEventListener('click', function () { // 개별 상품 삭제 버튼 클릭 이벤트 핸들러
      const cartItem = this.closest('.cart_item'); // 클릭된 삭제 버튼이 속한 상품 아이템을 찾기
      cartItem.remove(); // 상품 아이템을 DOM에서 제거

      // 장바구니 상태 업데이트
      updateCartSummary(); // 총계 재계산
      checkEmptyCart();    // 빈 장바구니 상태 체크
    });
  });

  // ========================================
  // 장바구니 전체 비우기 기능
  // ========================================

  /**
   * 장바구니 전체 비우기 버튼 이벤트 핸들러
   * 모든 상품을 장바구니에서 제거합니다.
   */
  if (cartClearBtn) { // 장바구니 전체 비우기 버튼이 있는지 확인
    cartClearBtn.addEventListener('click', function () { // 장바구니 전체 비우기 버튼 클릭 이벤트 핸들러
      // 모든 상품 아이템을 찾아서 제거
      const cartItems = document.querySelectorAll('.cart_item'); // 모든 상품 아이템을 찾기
      cartItems.forEach(item => item.remove()); // 모든 상품 아이템을 제거

      // 장바구니 상태 업데이트
      updateCartSummary(); // 총계 재계산
      checkEmptyCart();    // 빈 장바구니 상태 체크
    });
  }

  // ========================================
  // 주문하기 기능
  // ========================================

  /**
   * 주문하기 버튼 이벤트 핸들러
   * 주문 페이지로 이동하는 기능을 처리합니다.
   */
  if (cartCheckoutBtn) { // 주문하기 버튼이 있는지 확인
    cartCheckoutBtn.addEventListener('click', function () { // 주문하기 버튼 클릭 이벤트 핸들러
      alert('주문 페이지로 이동합니다.');
      // TODO: 실제 주문 페이지 이동 로직 구현
      // 예시: window.location.href = '/checkout';
    });
  }

  // ========================================
  // 장바구니 요약 정보 업데이트 함수
  // ========================================

  /**
   * 장바구니 요약 정보 업데이트 함수
   * 총 상품 수량과 총 금액을 계산하여 화면에 표시합니다.
   */
  function updateCartSummary() { // 장바구니 요약 정보 업데이트 함수
    // 모든 상품의 수량을 가져와서 총 상품수 계산
    const quantities = document.querySelectorAll('.quantity'); // 모든 상품의 수량을 찾기
    const totalItems = Array.from(quantities).reduce((sum, qty) => sum + parseInt(qty.textContent), 0); // 모든 상품의 수량을 합산

    // 총 상품수 표시 업데이트
    const totalInfo = document.querySelectorAll('.total_info strong'); // 총 상품수 표시 요소
    if (totalInfo[0]) totalInfo[0].textContent = totalItems + '개'; // 총 상품수 표시 요소의 텍스트 값을 총 상품수로 업데이트

    // ========================================
    // 총 금액 계산 로직
    // ========================================
    let totalPrice = 0; // 총 금액
    const cartItems = document.querySelectorAll('.cart_item'); // 모든 상품 아이템을 찾기

    cartItems.forEach(item => {
      // 상품 가격에서 숫자만 추출 (원, 쉼표 등 제거)
      const priceText = item.querySelector('.item_price').textContent; // 상품 가격 표시 요소의 텍스트 값
      const price = parseInt(priceText.replace(/[^0-9]/g, '')); // 상품 가격 표시 요소의 텍스트 값을 정수로 변환

      // 상품 수량 가져오기
      const quantity = parseInt(item.querySelector('.quantity').textContent); // 상품 수량 표시 요소의 텍스트 값을 정수로 변환

      // 상품별 총액 = 가격 × 수량
      totalPrice += price * quantity; // 상품별 총액을 총 금액에 추가
    });

    // 총 금액 표시 업데이트 (천 단위 쉼표 포함)
    if (totalInfo[1]) totalInfo[1].textContent = totalPrice.toLocaleString() + '원'; // 총 금액 표시 요소의 텍스트 값을 총 금액으로 업데이트
  }

  // ========================================
  // 빈 장바구니 상태 체크 및 UI 업데이트 함수
  // ========================================

  /**
   * 빈 장바구니 상태 체크 및 UI 업데이트 함수
   * 장바구니에 상품이 있는지 확인하고, 그에 따라 UI를 업데이트합니다.
   * 상품이 없으면 빈 장바구니 메시지를 표시하고, 있으면 요약 정보와 액션 버튼을 표시합니다.
   */
  function checkEmptyCart() {
    // 장바구니 관련 UI 요소들을 선택
    const cartItems = document.querySelector('.cart_items');     // 장바구니 상품 목록
    const cartEmpty = document.querySelector('.cart_empty');     // 빈 장바구니 메시지
    const cartSummary = document.querySelector('.cart_summary'); // 장바구니 요약 정보
    const cartActions = document.querySelector('.cart_actions'); // 장바구니 액션 버튼들

    // 상품이 없는 경우 - 빈 장바구니 UI 표시
    if (cartItems && cartItems.children.length === 0) {
      if (cartEmpty) cartEmpty.style.display = 'block';      // 빈 장바구니 메시지 표시
      if (cartSummary) cartSummary.style.display = 'none';   // 요약 정보 숨김
      if (cartActions) cartActions.style.display = 'none';   // 액션 버튼들 숨김
    } else {
      // 상품이 있는 경우 - 정상 장바구니 UI 표시
      if (cartEmpty) cartEmpty.style.display = 'none';       // 빈 장바구니 메시지 숨김
      if (cartSummary) cartSummary.style.display = 'block';  // 요약 정보 표시
      if (cartActions) cartActions.style.display = 'flex';   // 액션 버튼들 표시
    }
  }

  // ========================================
  // 초기 상태 설정
  // ========================================

  /**
   * 페이지 로드 시 장바구니 상태 체크
   * 페이지가 처음 로드될 때 장바구니의 현재 상태를 확인하고 UI를 업데이트합니다.
   */
  checkEmptyCart(); // 페이지 로드 시 장바구니 상태 체크
});



// ========================================
// Shop 페이지 전용 스크립트
// ========================================

/**
 * Shop 페이지에서 사용되는 전역 변수들
 * 페이지의 주요 요소들을 참조하기 위한 변수들입니다.
 */
let shopTopElement = null;      // 상단 영역 요소
let shopHeaderElement = null;   // 헤더 요소
let shopNavElement = null;      // Shop 네비게이션 요소

/**
 * Shop 페이지 전용 요소 초기화 함수
 * Shop 페이지의 주요 DOM 요소들을 선택하고 전역 변수에 할당합니다.
 */
function initShopElements() {
  shopTopElement = document.getElementById('top');           // 상단 영역
  shopHeaderElement = document.getElementById('header');     // 헤더 영역
  shopNavElement = document.querySelector('.shop_nav');      // Shop 네비게이션

  console.log('Shop 요소 초기화:', { // Shop 요소 초기화 로그
    top: shopTopElement, // 상단 영역
    header: shopHeaderElement, // 헤더 영역
    shopNav: shopNavElement // Shop 네비게이션
  });
}

/**
 * Shop 네비게이션 초기 위치 설정 함수
 * 상단 영역과 헤더의 높이를 계산하여 Shop 네비게이션의 위치를 설정합니다.
 * 이렇게 하면 네비게이션이 고정된 헤더 아래에 올바르게 위치하게 됩니다.
 */
function setShopNavPosition() {
  // 요소가 없으면 다시 초기화 시도
  if (!shopNavElement || !shopHeaderElement || !shopTopElement) { // Shop 요소가 없으면 다시 초기화 시도
    initShopElements(); // Shop 요소 초기화
  }

  if (shopNavElement && shopHeaderElement && shopTopElement) { // Shop 요소가 있으면 네비게이션 위치 설정
    // top 영역과 헤더 높이를 모두 계산
    const topHeight = shopTopElement.offsetHeight;        // 상단 영역 높이
    const headerHeight = shopHeaderElement.offsetHeight;  // 헤더 높이
    const totalHeight = topHeight + headerHeight;         // 총 높이

    // top + 헤더 높이만큼 margin-top 설정
    shopNavElement.style.marginTop = totalHeight + 'px';
    console.log('Shop - Top height:', topHeight, 'Header height:', headerHeight, 'Total margin-top:', shopNavElement.style.marginTop);
  } else {
    console.error('Shop 요소를 찾을 수 없습니다:', { // Shop 요소를 찾을 수 없습니다 로그
      shopNav: shopNavElement, // Shop 네비게이션
      header: shopHeaderElement, // 헤더 영역
      top: shopTopElement // 상단 영역
    });
  }
}

/**
 * Shop 페이지 전용 초기화 함수
 * Shop 페이지의 모든 기능을 초기화하는 메인 함수입니다.
 */
function initShopPage() { // Shop 페이지 전용 초기화 함수
  initShopElements();    // DOM 요소들 초기화
  setShopNavPosition();  // 네비게이션 위치 설정
}

/**
 * Shop 페이지 네비게이션 기능 초기화 함수
 * 카테고리 네비게이션 클릭 시 해당 섹션으로 스크롤하는 기능을 설정합니다.
 * 스크롤 시 현재 보이는 섹션에 맞는 네비게이션을 하이라이트하는 기능도 포함합니다.
 */
function initShopNavigation() { // Shop 페이지 네비게이션 기능 초기화 함수
  // 요소 초기화 먼저 실행
  initShopElements(); // DOM 요소들 초기화

  // shop nav 클릭 이벤트 관련 요소들 선택
  const navBoxes = document.querySelectorAll('.shop_nav .nav_list .nav_box'); // Shop 네비게이션 박스들

  /**
   * 카테고리별 섹션 매핑 객체
   * 네비게이션 텍스트와 실제 섹션 ID를 연결합니다.
   */
  const sections = { // 카테고리별 섹션 매핑 객체
    '조명 / 캔들': document.getElementById('shop_light'), // 조명 / 캔들 섹션
    '장식 데코': document.getElementById('shop_deco'), // 장식 데코 섹션
    '패브릭 소품': document.getElementById('shop_fabric'), // 패브릭 소품 섹션
    '플라워 / 그린': document.getElementById('shop_flower') // 플라워 / 그린 섹션
  };

  /**
   * 네비게이션 박스 클릭 이벤트 핸들러
   * 네비게이션을 클릭하면 해당 카테고리 섹션으로 부드럽게 스크롤됩니다.
   */
  navBoxes.forEach(navBox => { // Shop 네비게이션 박스들 반복문 처리
    navBox.addEventListener('click', function () { // Shop 네비게이션 박스 클릭 이벤트 핸들러
      const h3Text = this.querySelector('h3').textContent.trim(); // 클릭된 네비게이션의 텍스트
      const targetSection = sections[h3Text]; // 해당하는 섹션 요소

      if (targetSection) {
        // 모든 nav_box에서 click 클래스 제거 (선택 상태 초기화)
        navBoxes.forEach(box => box.classList.remove('click'));

        // 클릭된 nav_box에 click 클래스 추가 (선택 상태 표시)
        this.classList.add('click');

        // 해당 섹션으로 스크롤 위치 계산
        const headerHeight = shopHeaderElement ? shopHeaderElement.offsetHeight : 0;  // 헤더 높이
        const shopNavHeight = shopNavElement ? shopNavElement.offsetHeight : 0;        // 네비게이션 높이
        const sectionTop = targetSection.offsetTop;                                    // 섹션 상단 위치
        const scrollPosition = sectionTop - headerHeight - shopNavHeight - 20;        // 20px 여백 추가

        // 부드러운 스크롤로 해당 위치로 이동
        window.scrollTo({ // 부드러운 스크롤로 해당 위치로 이동
          top: scrollPosition, // 스크롤 위치
          behavior: 'smooth' // 부드러운 스크롤
        });
      }
    });
  });

  /**
   * 스크롤 시 활성 섹션 하이라이트 기능
   * 사용자가 스크롤할 때 현재 보이는 섹션에 맞는 네비게이션을 자동으로 하이라이트합니다.
   */
  window.addEventListener('scroll', function () { // 스크롤 이벤트 핸들러
    const headerHeight = shopHeaderElement ? shopHeaderElement.offsetHeight : 0;  // 헤더 높이
    const shopNavHeight = shopNavElement ? shopNavElement.offsetHeight : 0;      // 네비게이션 높이
    const scrollPosition = window.scrollY + headerHeight + shopNavHeight + 50;   // 고정된 요소들 고려한 오프셋

    // 모든 섹션 확인하여 현재 보이는 섹션 찾기
    Object.values(sections).forEach(section => { // 모든 섹션 확인하여 현재 보이는 섹션 찾기
      if (section) { // 섹션이 있는지 확인
        const sectionTop = section.offsetTop;                    // 섹션 상단 위치
        const sectionBottom = sectionTop + section.offsetHeight; // 섹션 하단 위치

        // 현재 스크롤 위치가 이 섹션 범위 내에 있는지 확인
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          // 해당 섹션에 맞는 nav_box 찾기
          const sectionTitle = section.id.replace('shop_', ''); // 섹션 ID에서 'shop_' 제거

          /**
           * 섹션 ID와 네비게이션 텍스트 매핑 객체
           */
          const titleMap = { // 섹션 ID와 네비게이션 텍스트 매핑 객체
            'light': '조명 / 캔들',
            'deco': '장식 데코',
            'fabric': '패브릭 소품',
            'flower': '플라워 / 그린'
          };

          const title = titleMap[sectionTitle]; // 섹션 ID에 맞는 네비게이션 텍스트
          if (title) { // 네비게이션 텍스트가 있는지 확인
            // 모든 nav_box에서 click 클래스 제거 (선택 상태 초기화)
            navBoxes.forEach(box => box.classList.remove('click'));

            // 해당 nav_box에 click 클래스 추가 (선택 상태 표시)
            const targetNavBox = Array.from(navBoxes).find(box => // 해당 nav_box에 click 클래스 추가 (선택 상태 표시)
              box.querySelector('h3').textContent.trim() === title // 네비게이션 텍스트가 일치하는지 확인
            );
            if (targetNavBox) { // 해당 nav_box에 click 클래스 추가 (선택 상태 표시)
              targetNavBox.classList.add('click'); // 해당 nav_box에 click 클래스 추가 (선택 상태 표시)
            }
          }
        }
      }
    });
  });
}

/**
 * 플로팅 버튼 기능 초기화 함수
 * 스크롤 시 나타나는 플로팅 버튼들의 기능을 설정합니다.
 * 특정 스크롤 위치에서 버튼들이 표시되고, 클릭 시 해당 섹션으로 이동합니다.
 */
function initFloatingButtons() { // 플로팅 버튼 기능 초기화 함수
  // 요소 초기화 먼저 실행
  initShopElements(); // DOM 요소들 초기화

  const floatingButtons = document.querySelectorAll('.floating_btn');        // 플로팅 버튼들
  const floatingContainer = document.querySelector('.shop_floating_buttons'); // 플로팅 버튼 컨테이너

  // 플로팅 버튼이 없으면 실행하지 않음
  if (floatingButtons.length === 0) { // 플로팅 버튼이 없으면 실행하지 않음
    console.log('플로팅 버튼을 찾을 수 없습니다.');
    return;
  }

  /**
   * 스크롤 이벤트로 플로팅 버튼 보이기/숨기기 기능
   * 300px 이상 스크롤하면 플로팅 버튼들이 나타나고, 그 미만이면 숨겨집니다.
   */
  window.addEventListener('scroll', function () { // 스크롤 이벤트 핸들러
    const scrollTop = window.scrollY; // 현재 스크롤 위치

    if (scrollTop > 300) { // 300px 이상 스크롤하면 보이기
      if (floatingContainer) { // 플로팅 버튼 컨테이너가 있는지 확인
        floatingContainer.classList.add('show'); // 플로팅 버튼 컨테이너에 show 클래스 추가
      }
    } else { // 300px 미만이면 숨기기
      if (floatingContainer) { // 플로팅 버튼 컨테이너가 있는지 확인
        floatingContainer.classList.remove('show'); // 플로팅 버튼 컨테이너에 show 클래스 제거
      }
    }
  });

  /**
   * 플로팅 버튼 클릭 이벤트 핸들러
   * 각 플로팅 버튼을 클릭하면 해당 섹션으로 이동하거나 맨 위로 스크롤합니다.
   */
  floatingButtons.forEach(button => { // 플로팅 버튼들 반복문 처리
    button.addEventListener('click', function () { // 플로팅 버튼 클릭 이벤트 핸들러
      const sectionId = this.getAttribute('data-section'); // 버튼의 data-section 속성값

      if (sectionId) { // 섹션 ID가 있는지 확인
        // 특정 섹션으로 이동
        const targetSection = document.getElementById(sectionId); // 해당 섹션 요소
        if (targetSection) { // 해당 섹션 요소가 있는지 확인
          const headerHeight = shopHeaderElement ? shopHeaderElement.offsetHeight : 0;  // 헤더 높이
          const shopNavHeight = shopNavElement ? shopNavElement.offsetHeight : 0;      // 네비게이션 높이
          const sectionTop = targetSection.offsetTop;                                    // 섹션 상단 위치
          const scrollPosition = sectionTop - headerHeight - shopNavHeight - (-20);     // 스크롤 위치 계산

          // 부드러운 스크롤로 해당 섹션으로 이동
          window.scrollTo({ // 부드러운 스크롤로 해당 위치로 이동
            top: scrollPosition, // 스크롤 위치
            behavior: 'smooth' // 부드러운 스크롤
          });
        }
      } else if (this.classList.contains('floating_top_btn')) { // 맨 위로 이동 (floating_top_btn 클래스가 있는 경우)
        // 맨 위로 이동 (floating_top_btn 클래스가 있는 경우)
        window.scrollTo({ // 부드러운 스크롤로 맨 위로 이동
          top: 0, // 스크롤 위치
          behavior: 'smooth' // 부드러운 스크롤
        });
      }
    });
  });
}

/**
 * 좋아요 기능 초기화 함수
 * 상품의 좋아요 버튼 클릭 시 하트 아이콘이 변경되고, localStorage에 상태를 저장합니다.
 * 페이지 로드 시 이전에 저장된 좋아요 상태를 복원합니다.
 */
function initLikeButtons() { // 좋아요 기능 초기화 함수
  const likeButtons = document.querySelectorAll('.like_btn'); // 모든 좋아요 버튼들

  /**
   * 좋아요 버튼 클릭 이벤트 핸들러
   * 클릭 시 좋아요 상태를 토글하고 아이콘을 변경합니다.
   * @param {Event} e - 클릭 이벤트 객체
   */
  likeButtons.forEach(btn => { // 좋아요 버튼들 반복문 처리
    btn.addEventListener('click', function (e) { // 좋아요 버튼 클릭 이벤트 핸들러
      e.preventDefault();      // 기본 동작 방지
      e.stopPropagation();    // 이벤트 버블링 방지

      const icon = this.querySelector('i');                    // 하트 아이콘 요소
      const isLiked = this.classList.contains('liked');       // 현재 좋아요 상태
      const productId = this.getAttribute('data-product-id'); // 상품 ID

      if (isLiked) {
        // 좋아요 취소 처리
        this.classList.remove('liked');                    // liked 클래스 제거
        icon.className = 'fa-regular fa-heart';           // 빈 하트 아이콘으로 변경
        console.log(`상품 ${productId} 좋아요 취소`);

        // localStorage에서 제거
        removeFromLikedProducts(productId);
      } else {
        // 좋아요 추가 처리
        this.classList.add('liked');                       // liked 클래스 추가
        icon.className = 'fa-solid fa-heart';             // 채워진 하트 아이콘으로 변경
        console.log(`상품 ${productId} 좋아요 추가`); // 좋아요 추가 로그

        // localStorage에 저장
        addToLikedProducts(productId);
      }
    });
  });

  // 페이지 로드 시 저장된 좋아요 상태 복원
  loadLikedProducts(); // 페이지 로드 시 저장된 좋아요 상태 복원
}

/**
 * 좋아요 상품을 localStorage에 저장하는 함수
 * @param {string} productId - 저장할 상품 ID
 */
function addToLikedProducts(productId) { // 좋아요 상품을 localStorage에 저장하는 함수
  let likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]'); // 저장된 좋아요 상태
  if (!likedProducts.includes(productId)) { // 좋아요 상품이 이미 있는지 확인
    likedProducts.push(productId); // 좋아요 상품에 추가
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts)); // 좋아요 상품을 localStorage에 저장
  }
}

/**
 * 좋아요 상품을 localStorage에서 제거하는 함수
 * @param {string} productId - 제거할 상품 ID
 */
function removeFromLikedProducts(productId) { // 좋아요 상품을 localStorage에서 제거하는 함수
  let likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]'); // 저장된 좋아요 상태
  likedProducts = likedProducts.filter(id => id !== productId); // 좋아요 상품에서 제거
  localStorage.setItem('likedProducts', JSON.stringify(likedProducts)); // 좋아요 상품을 localStorage에 저장
}

/**
 * 저장된 좋아요 상태를 복원하는 함수
 * 페이지 로드 시 localStorage에 저장된 좋아요 상태를 읽어와서 UI에 반영합니다.
 */
function loadLikedProducts() { // 저장된 좋아요 상태를 복원하는 함수
  const likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]'); // 저장된 좋아요 상태

  likedProducts.forEach(productId => { // 좋아요 상품들 반복문 처리
    const likeBtn = document.querySelector(`[data-product-id="${productId}"]`); // 좋아요 버튼
    if (likeBtn) { // 좋아요 버튼이 있는지 확인
      likeBtn.classList.add('liked');                    // liked 클래스 추가
      const icon = likeBtn.querySelector('i');           // 하트 아이콘
      icon.className = 'fa-solid fa-heart';            // 채워진 하트 아이콘으로 설정
    }
  });
}

// ========================================
// Shop 페이지 초기화 및 이벤트 리스너
// ========================================

/**
 * Shop 페이지 초기화
 * DOM이 완전히 로드된 후 Shop 페이지에서만 실행되는 초기화 함수들입니다.
 */
document.addEventListener('DOMContentLoaded', function () { // DOM이 완전히 로드된 후 실행되는 공통 기능 초기화
  // shop.html 페이지에서만 실행
  if (window.location.pathname.includes('shop.html')) { // shop.html 페이지에서만 실행
    console.log('DOM 로드 완료 - Shop 초기화 시작');
    initShopPage();           // Shop 페이지 기본 초기화
    initShopNavigation();     // 네비게이션 기능 초기화
    initFloatingButtons();    // 플로팅 버튼 기능 초기화
    initLikeButtons();        // 좋아요 기능 초기화
  }
});

/**
 * 윈도우 리사이즈 이벤트 핸들러
 * 화면 크기가 변경될 때 Shop 네비게이션의 위치를 다시 계산합니다.
 * 100ms 지연을 두어 리사이즈 이벤트가 완료된 후 실행됩니다.
 */
window.addEventListener('resize', function () { // 윈도우 리사이즈 이벤트 핸들러
  if (window.location.pathname.includes('shop.html')) { // shop.html 페이지에서만 실행
    setTimeout(setShopNavPosition, 100); // 100ms 후 네비게이션 위치 재설정
  }
});

// ========================================
// Event 페이지 전용 탭메뉴 기능
// ========================================

// 페이지 로드 시 이벤트 페이지 탭메뉴 초기화
document.addEventListener('DOMContentLoaded', function () { // 페이지 로드 시 이벤트 페이지 탭메뉴 초기화
  if (window.location.pathname.includes('event.html')) { // event.html 페이지에서만 실행
    initEventTabs(); // 탭메뉴 기능 활성화
  }
});

// 이벤트 탭메뉴 초기화 함수
function initEventTabs() { // 이벤트 탭메뉴 초기화 함수
  const tabButtons = document.querySelectorAll('.event_list ul.text li'); // 탭 버튼들
  const images = document.querySelectorAll('.event_img ul.img li'); // 이미지들

  // 각 탭 버튼에 클릭 이벤트 추가
  tabButtons.forEach((tab, index) => { // 각 탭 버튼에 클릭 이벤트 추가
    tab.addEventListener('click', () => { // 탭 버튼 클릭 이벤트 핸들러
      
      tabButtons.forEach(btn => btn.classList.remove('active')); // 모든 탭 비활성화    
      tab.classList.add('active'); // 클릭된 탭 활성화     
      images.forEach(img => img.classList.remove('active')); // 모든 이미지 숨김      
      images[index].classList.add('active'); // 해당 이미지 표시

    });
  });
}





// ========================================
// Review 페이지 전용 초기화
// ========================================

document.addEventListener('DOMContentLoaded', function () {
  if (window.location.pathname.includes('review.html')) {
    initReviewSwiper();
    initReviewMoreButtons();
  }
});

// ========================================
// Review 페이지 전용 스와이퍼
// ========================================

function initReviewSwiper() {
  const reviewSwiper = document.querySelector('.review_sub_swiper');

  if (reviewSwiper && typeof Swiper !== 'undefined') {
    const swiper = new Swiper('.review_sub_swiper', {
      slidesPerView: 2,
      spaceBetween: 20,
      loop: true,
      
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      
      breakpoints: {
        769: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        0: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
      },
      
      on: {
        init: function () {
          // console.log('=== Swiper 초기화 완료 ===');
          // console.log('총 슬라이드 개수:', this.slides.length);
          // console.log('현재 활성 슬라이드 인덱스:', this.activeIndex);
        },
        slideChange: function () {
          // console.log('슬라이드 변경됨 - 현재 인덱스:', this.activeIndex);
          // 슬라이드 변경 시 플로팅 썸네일 제거
          removeExistingThumbnail();
        },
        touchStart: function () {
          // 터치 시작 시 플로팅 썸네일 제거
          removeExistingThumbnail();
        },
        touchMove: function () {
          // 터치 이동 시 플로팅 썸네일 제거
          removeExistingThumbnail();
        }
      }
    });
  }
}

// ========================================
// Review 페이지 More 버튼 기능
// ========================================

function initReviewMoreButtons() {
  const moreButtons = document.querySelectorAll('.review_box a.more');
  
  moreButtons.forEach((button, index) => {
    // 클릭/터치 이벤트 리스너 추가
    button.addEventListener('click', function(e) {
      e.preventDefault();
      createFloatingThumbnail(this, index);
    });
  });
}

// 썸네일 이미지와 섹션 매핑
const thumbnailMapping = {
  0: {
    image: "https://github.com/love79hr/haru_e/blob/main/images/fabric_02.png?raw=true",
    section: "#shop_fabric"
  },
  1: {
    image: "https://github.com/love79hr/haru_e/blob/main/images/flower_10.png?raw=true", 
    section: "#shop_flower"
  },
  2: {
    image: "https://github.com/love79hr/haru_e/blob/main/images/light_04.png?raw=true",
    section: "#shop_light"
  },
  3: {
    image: "https://github.com/love79hr/haru_e/blob/main/images/deco_05.png?raw=true",
    section: "#shop_deco"
  },
  4: {
    image: "https://github.com/love79hr/haru_e/blob/main/images/fabric_02.png?raw=true",
    section: "#shop_fabric"
  },
  5: {
    image: "https://github.com/love79hr/haru_e/blob/main/images/flower_10.png?raw=true",
    section: "#shop_flower"
  },
  6: {
    image: "https://github.com/love79hr/haru_e/blob/main/images/light_04.png?raw=true",
    section: "#shop_light"
  },
  7: {
    image: "https://github.com/love79hr/haru_e/blob/main/images/deco_05.png?raw=true",
    section: "#shop_deco"
  }
};

function createFloatingThumbnail(button, index) {
  // 기존 플로팅 썸네일 제거
  removeExistingThumbnail();
  
  // 매핑 정보 가져오기
  const mapping = thumbnailMapping[index];
  if (!mapping) return;
  
  // 버튼의 위치 계산
  const buttonRect = button.getBoundingClientRect();
  const buttonCenterX = buttonRect.left + buttonRect.width / 2;
  const buttonCenterY = buttonRect.top + buttonRect.height / 2;
  
  // 플로팅 썸네일 생성
  const thumbnail = document.createElement('div');
  thumbnail.className = 'floating-thumbnail';
  thumbnail.style.left = (buttonCenterX + 20) + 'px'; // 버튼 오른쪽에 20px 간격
  thumbnail.style.top = (buttonCenterY - 100) + 'px'; // 버튼 중앙 높이에서 100px 위
  thumbnail.innerHTML = `
    <img src="${mapping.image}" alt="product thumbnail">
    <div class="thumbnail-overlay">
      <span>제품 보러가기</span>
    </div>
  `;
  
  // 클릭 이벤트 추가
  thumbnail.addEventListener('click', function() {
    navigateToSection(mapping.section);
  });
  
  // DOM에 추가
  document.body.appendChild(thumbnail);
  
  // 애니메이션 효과
  setTimeout(() => {
    thumbnail.classList.add('show');
  }, 10);
}

function removeExistingThumbnail() {
  const existingThumbnail = document.querySelector('.floating-thumbnail');
  if (existingThumbnail) {
    existingThumbnail.remove();
  }
}

function navigateToSection(sectionId) {
  // 플로팅 썸네일 제거
  removeExistingThumbnail();
  
  // 해당 섹션으로 이동
  const targetSection = document.querySelector(sectionId);
  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  } else {
    // shop.html 페이지로 이동
    window.location.href = 'shop.html' + sectionId;
  }
}