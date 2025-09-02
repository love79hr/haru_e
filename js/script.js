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

// 로그인 팝업창 요소들
const loginBtn = document.querySelector('.login_btn');
const loginPopup = document.querySelector('.login_popup');
const loginCloseBtn = loginPopup?.querySelector('.close_btn');

// 로그인 팝업창 열기
if (loginBtn) {
  loginBtn.addEventListener('click', function() {
    loginPopup.classList.add('active');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
  });
}

// 로그인 팝업창 닫기
if (loginCloseBtn) {
  loginCloseBtn.addEventListener('click', function() {
    loginPopup.classList.remove('active');
    document.body.style.overflow = ''; // 스크롤 복원
  });
}

// 로그인 팝업창 외부 클릭 시 닫기
if (loginPopup) {
  loginPopup.addEventListener('click', function(e) {
    if (e.target === loginPopup) {
      loginPopup.classList.remove('active');
      document.body.style.overflow = ''; // 스크롤 복원
    }
  });
}

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

// bar_menu 클릭 이벤트 - 서브메뉴 토글
document.addEventListener('DOMContentLoaded', function() {
  const barMenu = document.querySelector('.bar_menu a');
  const subMenu = document.querySelector('.bar_menu .sub_menu');
  
  if (barMenu && subMenu) {
    barMenu.addEventListener('click', function(e) {
      e.preventDefault();
      subMenu.classList.toggle('active');
    });
    
    // 메뉴 외부 클릭 시 메뉴 닫기
    document.addEventListener('click', function(e) {
      if (!barMenu.contains(e.target) && !subMenu.contains(e.target)) {
        subMenu.classList.remove('active');
      }
    });
    
    // ESC 키로 메뉴 닫기
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        subMenu.classList.remove('active');
      }
    });
  }
  
  // 검색 팝업창 기능
  const searchBtn = document.querySelector('.search_btn');
  const searchPopup = document.querySelector('.search_popup');
  const closeBtn = document.querySelector('.close_btn');
  const searchInput = document.querySelector('.search_input');
  const searchSubmit = document.querySelector('.search_submit');
  
  if (searchBtn && searchPopup) {
    // 검색 버튼 클릭 시 팝업 열기
    searchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      searchPopup.classList.add('active');
      // 팝업이 열린 후 검색 입력창에 포커스
      setTimeout(() => {
        searchInput.focus();
      }, 300);
    });
    
    // 닫기 버튼 클릭 시 팝업 닫기
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        searchPopup.classList.remove('active');
        searchInput.value = '';
      });
    }
    
    // 검색 제출 버튼 클릭 시
    if (searchSubmit) {
      searchSubmit.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
          // 여기에 실제 검색 로직 추가
          console.log('검색어:', searchTerm);
          alert(`"${searchTerm}" 검색 결과를 보여드립니다!`);
          searchPopup.classList.remove('active');
          searchInput.value = '';
        }
      });
    }
    
    // 팝업 외부 클릭 시 닫기
    searchPopup.addEventListener('click', function(e) {
      if (e.target === searchPopup) {
        searchPopup.classList.remove('active');
        searchInput.value = '';
      }
    });
    
    // ESC 키로 팝업 닫기
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && searchPopup.classList.contains('active')) {
        searchPopup.classList.remove('active');
        searchInput.value = '';
      }
    });
    
    // Enter 키로 검색 실행
    if (searchInput) {
      searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          const searchTerm = searchInput.value.trim();
          if (searchTerm) {
            console.log('검색어:', searchTerm);
            alert(`"${searchTerm}" 검색 결과를 보여드립니다!`);
            searchPopup.classList.remove('active');
            searchInput.value = '';
          }
        }
      });
    }
  }
});


// 장바구니 팝업창 요소들
const cartBtn = document.querySelector('.cart_btn');
const cartPopup = document.querySelector('.cart_popup');
const cartCloseBtn = cartPopup?.querySelector('.close_btn');

// 장바구니 팝업창 열기
if (cartBtn) {
  cartBtn.addEventListener('click', function() {
    cartPopup.classList.add('active');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
  });
}

// 장바구니 팝업창 닫기
if (cartCloseBtn) {
  cartCloseBtn.addEventListener('click', function() {
    cartPopup.classList.remove('active');
    document.body.style.overflow = ''; // 스크롤 복원
  });
}

// 장바구니 팝업창 외부 클릭 시 닫기
if (cartPopup) {
  cartPopup.addEventListener('click', function(e) {
    if (e.target === cartPopup) {
      cartPopup.classList.remove('active');
      document.body.style.overflow = ''; // 스크롤 복원
    }
  });
}

// ========================================
// 장바구니 상품 관리 기능 구현
// ========================================

// 장바구니 수량 조절 및 상품 관리 기능
document.addEventListener('DOMContentLoaded', function() {
  // 장바구니 내부 기능 관련 DOM 요소들을 선택
  const qtyBtns = document.querySelectorAll('.qty_btn');           // 수량 증가/감소 버튼들
  const removeBtns = document.querySelectorAll('.remove_btn');    // 상품 삭제 버튼들
  const cartClearBtn = document.querySelector('.cart_clear');     // 장바구니 비우기 버튼
  const cartCheckoutBtn = document.querySelector('.cart_checkout'); // 주문하기 버튼
  
  // ========================================
  // 수량 조절 기능 (증가/감소)
  // ========================================
  qtyBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // 현재 상품의 수량 표시 요소를 찾기
      const quantitySpan = this.parentNode.querySelector('.quantity');
      let quantity = parseInt(quantitySpan.textContent);
      
      // 버튼 클래스에 따라 수량 증가 또는 감소
      if (this.classList.contains('plus')) {
        quantity++; // 수량 증가
      } else if (this.classList.contains('minus') && quantity > 1) {
        quantity--; // 수량 감소 (최소 1개 유지)
      }
      
      // 수량 업데이트 및 총계 재계산
      quantitySpan.textContent = quantity;
      updateCartSummary(); // 장바구니 요약 정보 업데이트
    });
  });
  
  // ========================================
  // 개별 상품 삭제 기능
  // ========================================
  removeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // 클릭된 삭제 버튼이 속한 상품 아이템을 찾기
      const cartItem = this.closest('.cart_item');
      cartItem.remove(); // 상품 아이템을 DOM에서 제거
      
      // 장바구니 상태 업데이트
      updateCartSummary(); // 총계 재계산
      checkEmptyCart();    // 빈 장바구니 상태 체크
    });
  });
  
  // ========================================
  // 장바구니 전체 비우기 기능
  // ========================================
  if (cartClearBtn) {
    cartClearBtn.addEventListener('click', function() {
      // 모든 상품 아이템을 찾아서 제거
      const cartItems = document.querySelectorAll('.cart_item');
      cartItems.forEach(item => item.remove());
      
      // 장바구니 상태 업데이트
      updateCartSummary(); // 총계 재계산
      checkEmptyCart();    // 빈 장바구니 상태 체크
    });
  }
  
  // ========================================
  // 주문하기 기능
  // ========================================
  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener('click', function() {
      alert('주문 페이지로 이동합니다.');
      // TODO: 여기에 실제 주문 페이지 이동 로직 추가
      // 예: window.location.href = '/checkout';
    });
  }
  
  // ========================================
  // 장바구니 요약 정보 업데이트 함수
  // ========================================
  function updateCartSummary() {
    // 모든 상품의 수량을 가져와서 총 상품수 계산
    const quantities = document.querySelectorAll('.quantity');
    const totalItems = Array.from(quantities).reduce((sum, qty) => sum + parseInt(qty.textContent), 0);
    
    // 총 상품수 표시 업데이트
    const totalInfo = document.querySelectorAll('.total_info strong');
    if (totalInfo[0]) totalInfo[0].textContent = totalItems + '개';
    
    // ========================================
    // 총 금액 계산 로직
    // ========================================
    let totalPrice = 0;
    const cartItems = document.querySelectorAll('.cart_item');
    
    cartItems.forEach(item => {
      // 상품 가격에서 숫자만 추출 (원, 쉼표 등 제거)
      const priceText = item.querySelector('.item_price').textContent;
      const price = parseInt(priceText.replace(/[^0-9]/g, ''));
      
      // 상품 수량 가져오기
      const quantity = parseInt(item.querySelector('.quantity').textContent);
      
      // 상품별 총액 = 가격 × 수량
      totalPrice += price * quantity;
    });
    
    // 총 금액 표시 업데이트 (천 단위 쉼표 포함)
    if (totalInfo[1]) totalInfo[1].textContent = totalPrice.toLocaleString() + '원';
  }
  
  // ========================================
  // 빈 장바구니 상태 체크 및 UI 업데이트 함수
  // ========================================
  function checkEmptyCart() {
    // 장바구니 관련 UI 요소들을 선택
    const cartItems = document.querySelector('.cart_items');      // 상품 목록 영역
    const cartEmpty = document.querySelector('.cart_empty');     // 빈 장바구니 메시지
    const cartSummary = document.querySelector('.cart_summary'); // 총계 정보 영역
    const cartActions = document.querySelector('.cart_actions'); // 액션 버튼 영역
    
    // 상품이 없는 경우
    if (cartItems.children.length === 0) {
      cartEmpty.style.display = 'block';      // 빈 장바구니 메시지 표시
      cartSummary.style.display = 'none';     // 총계 정보 숨김
      cartActions.style.display = 'none';     // 액션 버튼 숨김
    } else {
      // 상품이 있는 경우
      cartEmpty.style.display = 'none';       // 빈 장바구니 메시지 숨김
      cartSummary.style.display = 'block';    // 총계 정보 표시
      cartActions.style.display = 'flex';     // 액션 버튼 표시
    }
  }
  
  // ========================================
  // 초기 상태 설정
  // ========================================
  checkEmptyCart(); // 페이지 로드 시 장바구니 상태 체크
});
