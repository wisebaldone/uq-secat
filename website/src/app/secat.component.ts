import {Component, ElementRef, Input, ViewChild} from  '@angular/core';
import {Course, Secat} from './courses';

declare var Plotly: any;

@Component({
    selector: 'secat',
    templateUrl: './secat.component.html',
    styleUrls: [ './secat.component.css']
})

export class SecatComponent {
    @Input() secat: Course;
    @ViewChild('graph') plotlyDiv: ElementRef;

    questions: any[];

    data = [
        {
            x: ['giraffes', 'orangutans', 'monkeys'],
            y: [20, 14, 23],
            type: 'bar'
        }
    ];

    ngOnInit() {
        this.questions = [
            this.secat.q1,
            this.secat.q2,
            this.secat.q3,
            this.secat.q4,
            this.secat.q5,
            this.secat.q6,
            this.secat.q7,
            this.secat.q8,
        ];
        Plotly.newPlot(this.plotlyDiv.nativeElement, this.data);
    }

    highestItem(question: any, current: number): boolean {
        var records = [
            question.strong_disagree.percent,
            question.disagree.percent,
            question.neutral.percent,
            question.agree.percent,
            question.strong_agree.percent
        ]
        records.sort(this.numberSort);
        return records[0] == current;
    }

    numberSort(a: number, b: number) {
        return b - a;
    }

    ratingGood(rate:string): boolean {
        let percent = parseInt(rate.split("%")[0]);
        return percent >= 70;
    }

    ratingNeutral(rate:string): boolean {
        let percent = parseInt(rate.split("%")[0]);
        return percent < 70 && percent > 30;
    }

    ratingBad(rate:string): boolean {
        let percent = parseInt(rate.split("%")[0]);
        return percent <= 30;
    }
}