import { Component, OnInit } from "@angular/core";
import { navBar } from "../../shared/nav-bar/nav-bar.component";
import { LeftNavBar } from "./left-nav-bar/left-nav-bar.component";
import { FooterBar } from "../../shared/footer-bar/footer-bar.component";
import { MyData } from "./components/my-data/my-data.component";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'my-account',
    standalone: true,
    imports: [navBar, LeftNavBar, FooterBar, MyData],
    templateUrl: './my-account.component.html',
    styleUrl: './my-account.component.scss'
})
export class MyAccountPage implements OnInit {
    constructor(private route: ActivatedRoute) { }
    currentSection = '';

    async ngOnInit() {
        this.currentSection = this.route.snapshot.paramMap.get('section')!;
        console.log(this.currentSection)
    }
}