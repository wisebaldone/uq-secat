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

    questions: Secat[] = [];

    data:any = [];

    layout = {
        title: '',
        barmode: 'group',
        margin: {
            l: 30,
            r: 10,
            t: 40,
            b: 30
        },
        yaxis: {
            rangemode: "nonnegative",
            range: [0, 100],
            autorange: false
        }
    };

    ngOnInit() {
        this.layout.title = this.secat.course + " : " + this.secat.year + " semester " + this.secat.semester.toString();
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


        this.data = [];


        let x = [];
        let yStrongAgree = [];
        let yAgree = [];
        let yNeutral = [];
        let yDisagree = [];
        let yStrongDisagree = [];
        let counter = 1;
        for (let question of this.questions) {
            x.push("Q" + counter.toString());
            yStrongAgree.push(question.strong_agree.percent);
            yAgree.push(question.agree.percent);
            yNeutral.push(question.neutral.percent);
            yDisagree.push(question.disagree.percent);
            yStrongDisagree.push(question.strong_disagree.percent);
            counter++;
        }

        this.data.push({
            y: yStrongDisagree,
            x: x,
            name: 'Strong Disagree',
            type: 'bar',
            marker: {
                color: 'rgb(224,53,62)'
            }
        });
        this.data.push({
            y: yDisagree,
            x: x,
            name: 'Disagree',
            type: 'bar',
            marker: {
                color: 'rgb(224,70,53)'
            }
        });
        this.data.push({
            y: yNeutral,
            x: x,
            name: 'Neutral',
            type: 'bar',
            marker: {
                color: 'rgb(239,120,40)'
            }
        });
        this.data.push({
            y: yAgree,
            x: x,
            name: 'Agree',
            type: 'bar',
            marker: {
                color: 'rgb(116,196,62)'
            }
        });
        this.data.push({
            y: yStrongAgree,
            x: x,
            name: 'Strong Agree',
            type: 'bar',
            marker: {
                color: 'rgb(72,163,39)'
            }
        });
        console.log(this.data);
        Plotly.newPlot(this.plotlyDiv.nativeElement, this.data, this.layout, {displayModeBar: false});
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

    lastQuestion(question:any): boolean {
        return question.description.indexOf("Overall") !== -1;
    }
}