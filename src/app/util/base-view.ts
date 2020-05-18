import {EventManagerService} from '../service/base/event-manager.service';
import {EventParams} from './event-manager-media';
import {Subject} from 'rxjs';
import {HostListener, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const EVENT_NAME_LOADER_SHOW = 'loader_show';
export const EVENT_NAME_LOADER_HIDE = 'loader_hide';
export const EVENT_NAME_OPEN_MODAL = 'open_modal';
export const EVENT_NAME_CLOSE_MODAL = 'close_modal';
export const EVENT_NAME_IMAGE_CHANGE = 'change_profile';
export const CALL_OPEN_SIGN_MODAL = 'open_login_modal';
// toast
export const TOAST_SUCCESS = 'toast_success';
export const TOAST_ERROR = 'toast_error';
export const TOAST_WARNING = 'toast_warning';
// load filter
export const LOAD_FILTER = 'load_filter';
export const CLEAN_FILTER = 'clean_filter';
export const MORE_FILTER = 'more_filter';
// publish offer
export const PUBLISH_OFFER = 'publish_offer';

// publish offer
export const NEXT_REGISTER = 'next_register';

// draft_company
export const DRAFT_COMPANY = 'draft_company';
// export CSV
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
// draft_company
export const ANIMATION_SUCCESS = 'animation_success';
export const HIDE_ANIMATION_SUCCESS = 'hide_animation_success';

export class BaseComponent<T> implements OnDestroy, OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  public isOnMobile = false;
  public isMediumScreen = false;
  public isLandscape = false;
  public isLargeScreen = false;

  public today: Date = new Date();

  @Input() public ViewModel: T;

  constructor(public eventManager: EventManagerService) {
    this.MediaQueryChanges();
    this.CheckMobileScreen();
    this.CheckLandscape();
    this.CheckLargeScreen();
    this.CheckMediumScreen();
  }

  ngOnInit() {
    this.today = new Date();
  }

  public getListYears() {
    const currentYear = new Date().getFullYear();
    const years: Array<any> = new Array<any>();
    for (let i = 0; i < 300; i++) {
      years.push({id: currentYear - i, name: (currentYear - i)});
    }
    return years;
  }

  public successToast(msg: string): void {
    const eventLoaderHide = new EventParams();
    eventLoaderHide.name = TOAST_SUCCESS;
    eventLoaderHide.params = msg;
    this.eventManager.broadcast(eventLoaderHide);
  }

  public errorToast(msg: string): void {
    const eventLoaderHide = new EventParams();
    eventLoaderHide.name = TOAST_ERROR;
    eventLoaderHide.params = msg;
    this.eventManager.broadcast(eventLoaderHide);
  }

  public warningToast(msg: string): void {
    const eventLoaderHide = new EventParams();
    eventLoaderHide.name = TOAST_WARNING;
    eventLoaderHide.params = msg;
    this.eventManager.broadcast(eventLoaderHide);
  }

  public ShowLoader(): void {
    const eventLoaderShow = new EventParams();
    eventLoaderShow.name = EVENT_NAME_LOADER_SHOW;
    this.eventManager.broadcast(eventLoaderShow);
  }

  public loadFilter(): void {
    const event = new EventParams();
    event.name = LOAD_FILTER;
    this.eventManager.broadcast(event);
  }

  public HideLoader(): void {
    const eventLoaderHide = new EventParams();
    eventLoaderHide.name = EVENT_NAME_LOADER_HIDE;
    this.eventManager.broadcast(eventLoaderHide);
  }

  public ShowSuccesAnimation(): void {
    const eventHideSuccess = new EventParams();
    eventHideSuccess.name = ANIMATION_SUCCESS;
    this.eventManager.broadcast(eventHideSuccess);
  }

  public HideSuccesAnimation(): void {
    const eventSuccess = new EventParams();
    eventSuccess.name = HIDE_ANIMATION_SUCCESS;
    this.eventManager.broadcast(eventSuccess);
  }

  goAnimation() {
    const _self = this;
    this.ShowSuccesAnimation();
    setTimeout(value => {
      _self.HideSuccesAnimation();
      _self.CloseModal();
    }, 2000);
  }

  public error() {
    this.HideLoader();
    this.errorToast('Sorry, there has been an issue with the system');
  }

  public CallOpenSignModal(): void {
    const eventLoaderHide = new EventParams();
    eventLoaderHide.name = CALL_OPEN_SIGN_MODAL;
    this.eventManager.broadcast(eventLoaderHide);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.MediaQueryChanges();
    this.CheckMobileScreen();
    this.CheckLandscape();
    this.CheckMediumScreen();
    this.CheckLargeScreen();
  }

  private CheckMobileScreen() {
    const self = this;
    self.isOnMobile = window.innerWidth < 992;
  }

  private CheckLargeScreen() {
    const self = this;
    self.isLargeScreen = window.innerWidth > 992 && window.innerWidth < 1200;
  }

  private CheckLandscape() {
    const self = this;
    self.isLandscape = window.orientation === 90 || window.orientation === -90;
  }

  private MediaQueryChanges() {
    const mql: MediaQueryList = window.matchMedia('(min-width: 992px)');
    const mqlLandscape: MediaQueryList = window.matchMedia('(orientation: portrait)');
    const mqlLargeScreen: MediaQueryList = window.matchMedia('(min-width: 960px) and (max-width: 1279px)');

    mql.addListener((mqlResult) => {
      this.isOnMobile = !mqlResult.matches;
    });
    mqlLandscape.addListener((mqlLandscapeResult) => {
      this.isLandscape = !mqlLandscapeResult.matches;
    });
    mqlLargeScreen.addListener((mqlLargeScreenResult) => {
      this.isLargeScreen = !mqlLargeScreenResult.matches;
    });
  }

  private CheckMediumScreen() {
    this.isMediumScreen = window.innerWidth < 1500;
  }

  public OpenModal(template: TemplateRef<any>): void {
    const eventLoaderHide = new EventParams();
    eventLoaderHide.name = EVENT_NAME_OPEN_MODAL;
    eventLoaderHide.params = template;
    this.eventManager.broadcast(eventLoaderHide);
  }

  public ChangeImage(img): void {
    const eventImage = new EventParams();
    eventImage.name = EVENT_NAME_IMAGE_CHANGE;
    eventImage.params = img;
    this.eventManager.broadcast(eventImage);
  }

  public CloseModal(): void {
    const eventLoaderHide = new EventParams();
    eventLoaderHide.name = EVENT_NAME_CLOSE_MODAL;
    this.eventManager.broadcast(eventLoaderHide);
  }

  public PublishOffer(): void {
    const eventPublish = new EventParams();
    eventPublish.name = PUBLISH_OFFER;
    this.eventManager.broadcast(eventPublish);
  }

  public NextRegister(): void {
    const eventNext = new EventParams();
    eventNext.name = NEXT_REGISTER;
    this.eventManager.broadcast(eventNext);
  }

  public cleanFilter(): void {
    const event = new EventParams();
    event.name = CLEAN_FILTER;
    this.eventManager.broadcast(event);
  }

  public moreFilter(show): void {
    const event = new EventParams();
    event.name = MORE_FILTER;
    event.params = show;
    this.eventManager.broadcast(event);
  }

  public DraftCompany(draft): void {
    const eventDraft = new EventParams();
    eventDraft.name = DRAFT_COMPANY;
    eventDraft.params = draft;
    this.eventManager.broadcast(eventDraft);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  clearStorageForNewOffer() {
    localStorage.removeItem('offerModel');
    localStorage.removeItem('survey');
    localStorage.removeItem('addedBoost');
    localStorage.removeItem('missingCredit');
    localStorage.removeItem('registrationDate');
  }

  convertDateForGraphqlString(date: Date): string {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-') + 'T00:00:00.000Z';
  }

  generateGuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  sendEventGoogle(category: any, action: any) {
    (window as any).ga('send', 'event', {
      eventCategory: category,
      eventAction: action
    });
  }

  public exportCSV(data, excelFileName): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {Sheets: {data: worksheet}, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
