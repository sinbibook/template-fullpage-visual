/**
 * Room Preview Page JavaScript
 */

(function() {
    'use strict';

    // Sample room data (replace with dynamic data from API/database)
    const roomsData = [
        {
            name: '디럭스',
            description: '편안한 휴식을 위한 기본 객실. 모던한 인테리어와 편리한 시설을 갖추고 있습니다.',
            size: '20평',
            capacity: '기준 2명 / 최대 4명',
            bed: '킹사이즈 1개',
            view: '시티뷰',
            image: 'images/deluxe.jpg'
        },
        {
            name: '프리미어',
            description: '넓은 공간과 프리미엄 어메니티. 여유로운 휴식과 품격 있는 서비스를 제공합니다.',
            size: '28평',
            capacity: '기준 2명 / 최대 4명',
            bed: '킹사이즈 1개',
            view: '오션뷰',
            image: 'images/premier.jpg'
        },
        {
            name: '스위트',
            description: '특별한 순간을 위한 럭셔리 공간. 거실과 침실이 분리된 넓은 구조입니다.',
            size: '35평',
            capacity: '기준 2명 / 최대 6명',
            bed: '킹사이즈 1개, 싱글 2개',
            view: '오션뷰',
            image: 'images/suite.jpg'
        },
        {
            name: '스위트 프리미어',
            description: '가족과 함께하는 따뜻한 시간. 넓은 공간과 다양한 편의시설을 제공합니다.',
            size: '32평',
            capacity: '기준 4명 / 최대 6명',
            bed: '킹사이즈 1개, 싱글 2개',
            view: '가든뷰',
            image: 'images/suite premier.jpg'
        },
        {
            name: '펜트하우스',
            description: '최고층의 프라이빗한 휴식. 탁월한 전망과 최고급 시설을 자랑합니다.',
            size: '50평',
            capacity: '기준 2명 / 최대 8명',
            bed: '킹사이즈 2개',
            view: '파노라마 오션뷰',
            image: 'images/penthouse.jpg'
        }
    ];

    // Render room list
    function renderRoomList() {
        const roomList = document.getElementById('room-list');
        if (!roomList) return;

        roomsData.forEach((room, index) => {
            const roomItem = document.createElement('div');
            roomItem.className = 'room-item';
            roomItem.style.animationDelay = `${index * 0.1}s`;

            roomItem.innerHTML = `
                <div class="room-image">
                    <img src="${room.image}" alt="${room.name}" loading="lazy">
                </div>
                <div class="room-content">
                    <h3 class="room-name">${room.name}</h3>
                    <p class="room-description">${room.description}</p>
                    <div class="room-info">
                        <div class="room-info-item">
                            <span class="room-info-label">크기</span>
                            <span class="room-info-value">${room.size}</span>
                        </div>
                        <div class="room-info-item">
                            <span class="room-info-label">인원</span>
                            <span class="room-info-value">${room.capacity}</span>
                        </div>
                        <div class="room-info-item">
                            <span class="room-info-label">침대</span>
                            <span class="room-info-value">${room.bed}</span>
                        </div>
                        <div class="room-info-item">
                            <span class="room-info-label">전망</span>
                            <span class="room-info-value">${room.view}</span>
                        </div>
                    </div>
                    <button class="room-btn" onclick="window.location.href='room.html'">
                        상세보기
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M3 8h10m0 0L9 4m4 4l-4 4"/>
                        </svg>
                    </button>
                </div>
            `;

            roomList.appendChild(roomItem);
        });
    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        renderRoomList();
    });

})();