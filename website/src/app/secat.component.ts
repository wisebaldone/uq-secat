import {Component, ElementRef, Input, ViewChild} from  '@angular/core';
import {Course, Secat} from './courses';

declare var Plotly: any;

@Component({
    selector: 'secat',
    templateUrl: './secat.component.html',
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
}