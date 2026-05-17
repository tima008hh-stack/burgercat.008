var searchInput = document.getElementById('search-goods');

if (searchInput) {
    searchInput.addEventListener('input', function (e) {
        var filterText = e.target.value.toLowerCase();
        var cards = document.querySelectorAll('.card');

        cards.forEach(function (card) {
            var titleElement = card.querySelector('h3');
            if (titleElement) {
                var titleText = titleElement.textContent.toLowerCase();
                
                // Если текст из поиска есть в названии, показываем карточку, если нет - скрываем
                if (titleText.indexOf(filterText) !== -1) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
}