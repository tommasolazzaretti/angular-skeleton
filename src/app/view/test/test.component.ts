import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BackendService} from 'src/app/service/backend-caller.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TestComponent implements OnInit {

  imgUrl = 'https://www.addlance.com/blog/wp-content/uploads/2019/04/immagini-da-scaricare.jpg';

  arrayImages = [];

  imgContainerClass = 'containerCss';

  constructor(public backendService: BackendService) {
  }

  ngOnInit() {

    let splashbase = 'https://splashbase.s3.amazonaws.com/mazwai/regular/omote_iceland__an_iceland_venture.png%3F1528050680';
    this.arrayImages =
      [
        {
          id: 8798,
          url: 'https://splashbase.s3.amazonaws.com/newoldstock/regular/tumblr_ph8vgdJV2r1sfie3io1_1280.jpg',
          large_url: 'https://splashbase.s3.amazonaws.com/newoldstock/large/tumblr_ph8vgdJV2r1sfie3io1_1280.jpg',
          source_id: null
        },
        {
          id: 788,
          url: 'https://splashbase.s3.amazonaws.com/littlevisuals/regular/tumblr_n4e0j6iBHs1sdyj9lo1_1280.jpg',
          large_url: 'https://splashbase.s3.amazonaws.com/littlevisuals/large/1rfmzeW',
          source_id: null
        },
        {
          id: 8802,
          url: 'https://splashbase.s3.amazonaws.com/mazwai/regular/the_sea_also_rises_FKY.png%3F1506949636',
          large_url: splashbase,
          source_id: 1801
        },
        {
          id: 8799,
          url: 'https://splashbase.s3.amazonaws.com/mazwai/regular/travelpockets_iceland_land_of_fire_and_ice.png%3F1528191920',
          large_url: splashbase,
          source_id: 1798
        },
        {
          id: 8806,
          url: 'https://splashbase.s3.amazonaws.com/travelcoffeebook/regular/tumblr_nx5c7cX0L01ta0hnbo1_1280.jpg',
          large_url: 'https://splashbase.s3.amazonaws.com/travelcoffeebook/large/tumblr_nx5c7cX0L01ta0hnbo1_1280.jpg',
          source_id: null
        },
        {
          id: 8803,
          url: 'https://splashbase.s3.amazonaws.com/newoldstock/regular/tumblr_ph8vghR1xH1sfie3io1_1280.jpg',
          large_url: 'https://splashbase.s3.amazonaws.com/newoldstock/large/tumblr_ph8vghR1xH1sfie3io1_1280.jpg',
          source_id: null
        },
        {
          id: 8800,
          url: splashbase,
          large_url: splashbase,
          source_id: 1799
        },
        {
          id: 8804,
          url: 'https://splashbase.s3.amazonaws.com/newoldstock/regular/tumblr_ph8vgllGS71sfie3io1_1280.jpg',
          large_url: 'https://splashbase.s3.amazonaws.com/newoldstock/large/tumblr_ph8vgllGS71sfie3io1_1280.jpg',
          source_id: null
        },
        {
          id: 781,
          url: 'https://splashbase.s3.amazonaws.com/littlevisuals/regular/tumblr_mvlo8zqMLr1sdyj9lo1_1280.jpg',
          large_url: 'https://splashbase.s3.amazonaws.com/littlevisuals/large/HzjB4L',
          source_id: null
        },
        {
          id: 787,
          url: 'https://splashbase.s3.amazonaws.com/littlevisuals/regular/tumblr_n4e0mi1mrk1sdyj9lo1_1280.jpg',
          large_url: 'https://splashbase.s3.amazonaws.com/littlevisuals/large/1h5IqEf',
          source_id: null
        }
      ];

  }

  addImages() {
    this.arrayImages.push(...this.arrayImages);
  }

}
