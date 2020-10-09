import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {
  public dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#F5DEB3',
          '#5F9EA0',
          '#00FFFF',
        ],
      },
    ],
    labels: [],
  };
  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget')
    // tslint:disable-next-line: align
    .subscribe((res: any) => {
      for (let i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
        this.createChart();
      }
      });
}

// tslint:disable-next-line: typedef
createChart() {
  // tslint:disable-next-line: prefer-const
  // let ctx = document.getElementById('myChart').getContext('2d');
  // tslint:disable-next-line: prefer-const
  let ctx = document.getElementById('myChart');
  // tslint:disable-next-line: prefer-const
  let myPieChart = new Chart(ctx, {
    type: 'pie',
    data: this.dataSource
  });
}
}
