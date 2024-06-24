// $(document).on('ready', function() {

      $(".regular").slick({
		dots: false,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    }
    // ,
    // {
    //   breakpoint: 500,
    //   settings: 'unslick',
    // },
  ],
      });

    // });


$('.center').slick({
  centerMode: true,
  centerPadding: '60px',
  slidesToShow: 3,
	autoplay: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
		 prevArrow: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});


function section_1() {
  var dots_1 = document.getElementById("dots_1");
  var moreText_1 = document.getElementById("more_1");
  var btnText_1 = document.getElementById("myBtn_1");

  if (dots_1.style.display === "none") {
    dots_1.style.display = "inline";
    btnText_1.innerHTML = "Read more"; 
    moreText_1.style.display = "none";
  } else {
    dots_1.style.display = "none";
    btnText_1.innerHTML = "Read less"; 
    moreText_1.style.display = "inline";
  }
}


function section_2() {
  var dots_2 = document.getElementById("dots_2");
  var moreText_2 = document.getElementById("more_2");
  var btnText_2 = document.getElementById("myBtn_2");

  if (dots_2.style.display === "none") {
    dots_2.style.display = "inline";
    btnText_2.innerHTML = "Read more"; 
    moreText_2.style.display = "none";
  } else {
    dots_2.style.display = "none";
    btnText_2.innerHTML = "Read less"; 
    moreText_2.style.display = "inline";
  }
}

function section_3() {
  var dots_3 = document.getElementById("dots_3");
  var moreText_3 = document.getElementById("more_3");
  var btnText_3 = document.getElementById("myBtn_3");

  if (dots_3.style.display === "none") {
    dots_3.style.display = "inline";
    btnText_3.innerHTML = "Read more"; 
    moreText_3.style.display = "none";
  } else {
    dots_3.style.display = "none";
    btnText_3.innerHTML = "Read less"; 
    moreText_3.style.display = "inline";
  }
}

function section_4() {
  var dots_4 = document.getElementById("dots_4");
  var moreText_4 = document.getElementById("more_4");
  var btnText_4 = document.getElementById("myBtn_4");

  if (dots_4.style.display === "none") {
    dots_4.style.display = "inline";
    btnText_4.innerHTML = "Read more"; 
    moreText_4.style.display = "none";
  } else {
    dots_4.style.display = "none";
    btnText_4.innerHTML = "Read less"; 
    moreText_4.style.display = "inline";
  }
}


function section_5() {
  var dots_5 = document.getElementById("dots_5");
  var moreText_5 = document.getElementById("more_5");
  var btnText_5 = document.getElementById("myBtn_5");

  if (dots_5.style.display === "none") {
    dots_5.style.display = "inline";
    btnText_5.innerHTML = "Read more"; 
    moreText_5.style.display = "none";
  } else {
    dots_5.style.display = "none";
    btnText_5.innerHTML = "Read less"; 
    moreText_5.style.display = "inline";
  }
}

















