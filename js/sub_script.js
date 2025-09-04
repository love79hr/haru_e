// Shop 페이지 전용 JavaScript - 완전 독립형 (공통 기능 포함)

// ========================================
// 공통 기능 - 모든 페이지에서 사용
// ========================================

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

// ========================================
// Shop 페이지 전용 변수들
// ========================================
let shopTopElement = null;
let shopHeaderElement = null;
let shopNavElement = null;

// Shop 페이지 전용 요소 초기화
function initShopElements() {
  shopTopElement = document.getElementById('top');
  shopHeaderElement = document.getElementById('header');
  shopNavElement = document.querySelector('.shop_nav');
  
  console.log('Shop 요소 초기화:', {
    top: shopTopElement,
    header: shopHeaderElement,
    shopNav: shopNavElement
  });
}

// 페이지 로드 시 shop nav 초기 위치 설정
function setShopNavPosition() {
  // 요소가 없으면 다시 초기화 시도
  if (!shopNavElement || !shopHeaderElement || !shopTopElement) {
    initShopElements();
  }
  
  if (shopNavElement && shopHeaderElement && shopTopElement) {
    // top 영역과 헤더 높이를 모두 계산
    const topHeight = shopTopElement.offsetHeight;
    const headerHeight = shopHeaderElement.offsetHeight;
    const totalHeight = topHeight + headerHeight;
    
    // top + 헤더 높이만큼 margin-top 설정
    shopNavElement.style.marginTop = totalHeight + 'px';
    console.log('Shop - Top height:', topHeight, 'Header height:', headerHeight, 'Total margin-top:', shopNavElement.style.marginTop);
  } else {
    console.error('Shop 요소를 찾을 수 없습니다:', {
      shopNav: shopNavElement,
      header: shopHeaderElement,
      top: shopTopElement
    });
  }
}

// Shop 페이지 전용 초기화 함수
function initShopPage() {
  initShopElements();
  setTimeout(setShopNavPosition, 100);
  setTimeout(setShopNavPosition, 300);
  setTimeout(setShopNavPosition, 500); // 추가 지연
}

// DOM 로드 완료 시
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM 로드 완료 - Shop 초기화 시작');
  initShopPage();
});

// 윈도우 로드 완료 시
window.addEventListener('load', function() {
  console.log('윈도우 로드 완료 - Shop 초기화 시작');
  initShopPage();
});

// 윈도우 리사이즈 시
window.addEventListener('resize', function() {
  setTimeout(setShopNavPosition, 100);
});

// 즉시 실행 (여러 번 시도)
setTimeout(initShopPage, 0);
setTimeout(initShopPage, 50);
setTimeout(initShopPage, 200);

// Shop 페이지 전용 스크롤 이벤트 리스너
window.addEventListener('scroll', function() {
  const scrollTop = window.scrollY;
  const floatingButtons = document.querySelector('.shop_floating_buttons');
  
  // 플로팅 버튼 표시/숨김
  if (floatingButtons) {
    if (scrollTop > 200) {
      floatingButtons.classList.add('show');
    } else {
      floatingButtons.classList.remove('show');
    }
  }
  
  if (scrollTop > 50) {
    // top 영역을 숨기기
    if (shopTopElement) {
      shopTopElement.classList.add('hide');
    }

    // 헤더를 상단에 고정하고 스타일 변경
    if (shopHeaderElement) {
      shopHeaderElement.style.position = 'fixed';
      shopHeaderElement.style.top = '0';
      shopHeaderElement.style.padding = 'clamp(5px, 1vw, 10px) clamp(10px, 2.6vw, 50px) clamp(5px, 1vw, 10px) clamp(10px, 2.6vw, 50px)';
      shopHeaderElement.style.backgroundColor = 'var(--bg-color2)';
    }

    // shop nav를 헤더 바로 아래에 정확히 위치시키기 (top 영역은 숨겨짐)
    if (shopNavElement && shopHeaderElement) {
      // 헤더 높이만 계산 (top 영역은 숨겨짐)
      const headerHeight = shopHeaderElement.offsetHeight;
      shopNavElement.style.marginTop = headerHeight + 'px';
      
      // shop nav의 ul들만 숨기기 (h3은 유지)
      const navBoxes = shopNavElement.querySelectorAll('.nav_box ul');
      navBoxes.forEach(ul => {
        ul.style.display = 'none';
      });
      
      // h3 요소들을 보이게 하기
      const h3Elements = shopNavElement.querySelectorAll('.nav_box h3');
      h3Elements.forEach(h3 => {
        h3.style.display = 'block';
        h3.style.visibility = 'visible';
      });
    }
  } else {
    // top 영역을 다시 보이기
    if (shopTopElement) {
      shopTopElement.classList.remove('hide');
    }

    // 헤더를 원래 위치로 복원
    if (shopHeaderElement) {
      shopHeaderElement.style.position = 'fixed';
      shopHeaderElement.style.top = 'clamp(20px, 2.1vw, 40px)';
      shopHeaderElement.style.padding = 'clamp(20px, 2.6vw, 50px) clamp(10px, 2.6vw, 50px) clamp(10px, 2vw, 10px) clamp(10px, 2.6vw, 50px)';
      shopHeaderElement.style.backgroundColor = 'var(--bg-color)';
    }

    // shop nav를 원래 위치로 복원
    if (shopNavElement && shopHeaderElement && shopTopElement) {
      // top 영역과 헤더 높이를 모두 계산
      const topHeight = shopTopElement.offsetHeight;
      const headerHeight = shopHeaderElement.offsetHeight;
      const totalHeight = topHeight + headerHeight;
      shopNavElement.style.marginTop = totalHeight + 'px';
      
      // shop nav의 ul들을 다시 보이기 (480px 이하에서는 숨김)
      const navBoxes = shopNavElement.querySelectorAll('.nav_box ul');
      const isMobile = window.innerWidth <= 480;
      navBoxes.forEach(ul => {
        ul.style.display = isMobile ? 'none' : 'block';
      });
      
      // h3 요소들을 보이게 하기
      const h3Elements = shopNavElement.querySelectorAll('.nav_box h3');
      h3Elements.forEach(h3 => {
        h3.style.display = 'block';
        h3.style.visibility = 'visible';
      });
    }
  }
});

// Shop 페이지 네비게이션 기능 - 독립형
function initShopNavigation() {
  // shop nav 클릭 이벤트
  const navBoxes = document.querySelectorAll('.shop_nav .nav_list .nav_box');
  const sections = {
    '조명 / 캔들': document.getElementById('shop_light'),
    '장식 데코': document.getElementById('shop_deco'),
    '패브릭 소품': document.getElementById('shop_fabric'),
    '플라워 / 그린': document.getElementById('shop_flower')
  };

  navBoxes.forEach(navBox => {
    navBox.addEventListener('click', function() {
      const h3Text = this.querySelector('h3').textContent.trim();
      const targetSection = sections[h3Text];
      
      if (targetSection) {
        // 모든 nav_box에서 click 클래스 제거
        navBoxes.forEach(box => box.classList.remove('click'));
        
        // 클릭된 nav_box에 click 클래스 추가
        this.classList.add('click');
        
        // 해당 섹션으로 스크롤
        const headerHeight = shopHeaderElement ? shopHeaderElement.offsetHeight : 0;
        const shopNavHeight = shopNavElement ? shopNavElement.offsetHeight : 0;
        const sectionTop = targetSection.offsetTop;
        const scrollPosition = sectionTop - headerHeight - shopNavHeight - 20; // 20px 여백 추가
        
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 스크롤 시 활성 섹션 하이라이트
  window.addEventListener('scroll', function() {
    const headerHeight = shopHeaderElement ? shopHeaderElement.offsetHeight : 0;
    const shopNavHeight = shopNavElement ? shopNavElement.offsetHeight : 0;
    const scrollPosition = window.scrollY + headerHeight + shopNavHeight + 50; // 고정된 요소들 고려한 오프셋
    
    // 모든 nav_box에서 click 클래스 제거
    navBoxes.forEach(box => box.classList.remove('click'));
    
    // 현재 보이는 섹션 찾기
    let activeSection = null;
    Object.values(sections).forEach(section => {
      if (section && scrollPosition >= section.offsetTop - 100) {
        activeSection = section;
      }
    });
    
    // 활성 섹션에 해당하는 nav_box에 click 클래스 추가
    if (activeSection) {
      const sectionId = activeSection.id;
      const sectionNames = {
        'shop_light': '조명 / 캔들',
        'shop_deco': '장식 데코',
        'shop_fabric': '패브릭 소품',
        'shop_flower': '플라워 / 그린'
      };
      
      const sectionName = sectionNames[sectionId];
      if (sectionName) {
        navBoxes.forEach(navBox => {
          if (navBox.querySelector('h3').textContent.trim() === sectionName) {
            navBox.classList.add('click');
          }
        });
      }
    }
  });
}

// Shop 페이지 네비게이션 초기화
document.addEventListener('DOMContentLoaded', function() {
  initShopNavigation();
  initFloatingButtons();
});

// 플로팅 버튼 기능 초기화
function initFloatingButtons() {
  const floatingButtons = document.querySelectorAll('.floating_btn');
  
  floatingButtons.forEach(button => {
    button.addEventListener('click', function() {
      const sectionId = this.getAttribute('data-section');
      
      if (sectionId) {
        // 섹션으로 이동
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
          const headerHeight = shopHeaderElement ? shopHeaderElement.offsetHeight : 0;
          const shopNavHeight = shopNavElement ? shopNavElement.offsetHeight : 0;
          const sectionTop = targetSection.offsetTop;
          const scrollPosition = sectionTop - headerHeight - shopNavHeight - 20;
          
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
        }
      } else if (this.classList.contains('floating_top_btn')) {
        // 맨 위로 이동
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  });
}
