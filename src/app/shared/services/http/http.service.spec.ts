import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { TestBed, getTestBed } from '@angular/core/testing'
import {environment} from '../../../../environments/environment'
import { IAGGridYouTubeAPI } from '../../utiles/interface'
import { HttpService } from './http.service'

describe('HttpService', () => {
  let injector: TestBed
  let service: HttpService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService],
    })
    injector = getTestBed()
    service = injector.get(HttpService)
    httpMock = injector.get(HttpTestingController)
  })
  describe('#getData', () => {
    it('should return an Observable<IPost[]>', () => {
      const dummyPosts: IAGGridYouTubeAPI = {
        kind: 'youtube#searchListResponse',
        etag: '-McN5M5kyBnoyNJcyQk8j2oEDs0',
        nextPageToken: 'CDIQAA',
        regionCode: 'TN',
        pageInfo: {
          totalResults: 1000000,
          resultsPerPage: 50,
        },
        items: [
          {
            kind: 'youtube#searchResult',
            etag: 'IyPUTU8oWLWNgTyT4_fw6MWEwPQ',
            id: {
              kind: 'youtube#video',
              videoId: '3fumBcKC6RE',
            },
            snippet: {
              publishedAt: '2011-05-12T20:01:31Z',
              channelId: 'UCEOhcOACopL42xyOBIv1ekg',
              title: 'Lil Wayne - John ft. Rick Ross (Explicit) (Official Music Video)',
              description:
                'Music video by Lil Wayne performing John. (C) 2011 Cash Money Records Inc.',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/3fumBcKC6RE/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/3fumBcKC6RE/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/3fumBcKC6RE/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'LilWayneVEVO',
              liveBroadcastContent: 'none',
              publishTime: '2011-05-12T20:01:31Z',
            },
          },
        ],
      }

      service.getAPIResponse().subscribe((res: IAGGridYouTubeAPI) => {
        expect(res.items.length).toBe(1)
        expect(res).toEqual(dummyPosts)
      })

      const req = httpMock.expectOne(environment.baseUrl.baseUrl)
      expect(req.request.method).toBe('GET')
      req.flush(dummyPosts)
    })
  })
})
