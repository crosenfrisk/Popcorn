document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    // not sure this is needed but it was provided as an example on Bulma re: modals
    // function closeAllModals() {
    //   (document.querySelectorAll('.modal') || []).forEach(($modal) => {
    //     closeModal($modal);
    //   });
    // }
  
    // Add a click event on buttons to open a specific modal (I have yet to set a trigger on an img/movie element, but did hardcode in index.html: <button class="modal-trigger" data-target="modal"> inside <div class="movie-images">... )
    (document.querySelectorAll('modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
      console.log($target);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  });