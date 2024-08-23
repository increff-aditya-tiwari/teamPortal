import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  activePaths = {
    'home' :  ['/admin/home'],
    'profile': ['/admin/profile'],
    'teams' : ['/admin/teams', '/admin/view-team-requests','/admin/add-team-member','/admin/view-team-members'],  
    'create-team' : ['/admin/create-team'],  
    'events' : ['/admin/events','/admin/view-event-participants','/admin/add-event-participant','/admin/view-event-requests','/admin/view-event-claims','/admin/view-event-claim-expenses','/admin/update-event-claim-expenses','/admin/view-event-claim-approval'],
    'create-event' : ['/admin/create-event'],
    'approval' : ['/admin/view-approvals','/admin/events?forApproval=true']
  };
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  isActive(page : string): boolean {
    const paths = this.activePaths[page];
    if(page == 'approval'){
      return this.router.url.includes('forApproval=true') || this.router.url.startsWith('/admin/view-approvals');
    }else{
      return paths.some(path => this.router.url.includes(path)) && !this.router.url.includes('forApproval=true');
    }  
  }

}
