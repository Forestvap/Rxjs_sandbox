import $ from 'jquery';
import Rx from 'rxjs/Rx';
import { writeToSelector, replaceContentAtSelector } from './helpers';

const input = $('#input');
// const output = $('#output');

/*
 * click event: fromEvent
 */
const btn = $('#btn');
const btnStream$ = Rx.Observable.fromEvent(btn, 'click');

// btnStream$.subscribe(
//     function(e){
//         console.log('clicked');
//     },
//     function(err){
//         console.log('err');
//     },
//     function(){
//         console.log('completed');
//     }
// );
btnStream$.subscribe(event => {
  console.log('event', event.target.dataset);
  return writeToSelector('#output', event.target.dataset.attr)});

/*
 * input event: fromEvent
 *
 */
const inputText = $('#inputText');
const inputStream$ = Rx.Observable.fromEvent(inputText, 'keyup');

inputStream$.subscribe(
    function(e){
        console.log(e.target.value);
				return writeToSelector('#inputTextOutput', `Output: ${e.target.value}`);
    },
    function(){
        console.log('completed');
    }
);

/*
 * mouse move event: fromEvent
 *
 */
const moveStream$ = Rx.Observable.fromEvent(document, 'mousemove');

moveStream$.subscribe(
    function(e){
        console.log(e.target.value);
        return writeToSelector('#mouseMove', `<h1>X: ${e.clientX} Y：${e.clientY}</h1>`);
    },
    function(){
        console.log('completed');
    }
);

const numbers = [33, 44, 55, 66, 77];

const numbers$ = Rx.Observable.from(numbers);

numbers$
  .take(3)
  .subscribe(
    v => {
			writeToSelector('#numberOutput', `<h4>${v}</h4>`)
    },
    error => {
      console.log(error);
    },
    complete => {
      console.log('Completed');
    }
);

/**
 * post
 *
 * @type {*[]}
 */
const posts = [
    {title: 'POST ONE', body: 'This is the body one'},
    {title: 'POST TWO', body: 'This is the body two'},
    {title: 'POST THREE', body: 'This is the body three'}
];

const posts$ = Rx.Observable.from(posts);

posts$.subscribe(
    post => {
        console.log(post);
        $('#posts').append('<li><h3>' +post.title + '<h3><p>' + post.body +'</p></li>');
    },
    error => {
        console.log(error);
    },
    complete => {
        console.log('Completed');
    }
)

// // Set
const set = new Set(['Hello', 44, {title: 'My Title'}]);

const set$ = Rx.Observable.from(set);

set$.subscribe(
    v => {
    	console.log('set', v)
			writeToSelector('#set', `${v.title}`)
		},
    err => {
        console.log(err);
    },
    complete => {
        console.log('Completed');
    }
);

// // Map

const map = new Map([[1,2],[2,3],[3,4]]);

const maps$ = Rx.Observable.from(map);

maps$.subscribe(
    v => {
        console.log(v);
			writeToSelector('#maps', `[${v[0]}, ${v[1]}]`)
    },
    err => {
        console.log(err);
    },
    complete => {
        console.log('Completed');
    }
)

// Source Observer

const source$ = new Rx.Observable(
    observer => {
      console.log('Creating Observable');
			replaceContentAtSelector('#source', `<p>Creating Observable</p>`);
      setTimeout(()=>{
        observer.next(
          replaceContentAtSelector('#source', `<p>Hello World</p>`)
        );
      }, 1000);

			setTimeout(()=>{
				observer.next(
					replaceContentAtSelector('#source', `<p>Another World</p>`)
				);
			}, 1000);

      observer.error(new Error('Error: something went wrong'));
      setTimeout(()=>{
				observer.next(
					replaceContentAtSelector('#source', `<p>Another World Two</p>`)
				);
          observer.complete();
      }, 3000);
    }
);

// source$
// .catch(err => Rx.Observable.of(err))
// .subscribe(
//     x => {
//         console.log('errr', x);
//     },
//     err => {
//         console.log(err);
//     },
//     complete => {
//         console.log('Completed');
//     }
// );

// Promise

const myPromise = new Promise(
    (resolve, reject) => {
        console.log('Creating promise');
        setTimeout(() => {
            resolve('Hello From promise');
        }, 3000);
    }
);

myPromise.then(
    x => {
        console.log(x);
    }
);

const promise$ = Rx.Observable.fromPromise(myPromise);

promise$.subscribe(
    x => console.log('promise$', x)
);

/**
 * get users fromPromise
 * @param username
 * @returns {*}
 */
function getUser(username){
    return $.ajax({
        url: 'https://api.github.com/users/' + username,
        dataType: 'jsonp'
    }).promise();
}

const inputSource1$ = Rx.Observable.fromEvent($('#inputSource'), 'keyup');

inputSource1$
  .debounceTime(1000)
	.map(e => e.target.value)
	.switchMap(v =>{
		return Rx.Observable.fromPromise(getUser(v));
	})
  .subscribe(
    e => {
			console.log('github api data', e.data);
			$('#name').text(e.data.name);
			$('#blog').text(e.data.blog);
			$('#repos').text('Public repos: ' + e.data.public_repos);
    },
    error => {
        console.log(error);
    }
);

/**
 * interval count
  */
const count1$ = Rx.Observable.interval(100)
    .take(6);

const count2$ = Rx.Observable.timer(5000, 2000)
    .take(6);

const count3$ = Rx.Observable.range(25,100);

count1$.subscribe(val => writeToSelector('#count1', val));
count2$.subscribe(val => writeToSelector('#count2', val));
count3$.subscribe(val => writeToSelector('#count3', val));

/**
 * Map
 */
const arr = [
    'John',
    'Tom',
    'Shawn'
];

const map$ = Rx.Observable.interval(1000)
    .take(10)
    .map(v => v*2);
const arr$ = Rx.Observable.from(arr)
    .map(v=> v.toUpperCase())
    .map(v=> 'I am ' + v);

arr$.subscribe(v => {
  return writeToSelector('#arr', v)});

map$.subscribe(value => {
	return writeToSelector('#map', value)});

const users = [
    {name: 'Will', age: 34, job: { title: 'Developer', language: 'JavaScript' }},
    {name: 'Mike', age: 33},
    {name: 'Paul', age: 35},
];

const users$ = Rx.Observable.from(users)
    .pluck('job', 'title');

users$.subscribe(x => console.log('usersname', x));

// //merge

// Rx.Observable.of('Hello')
//     .merge(Rx.Observable.of('Everyone'))
//     .subscribe(x => console.log(x));

// Rx.Observable.interval(1000)
//     .merge(Rx.Observable.interval(500))
//     .take(25)
//     .subscribe(x => console.log(x));


// const source1$ = Rx.Observable.interval(2000).map(v => 'Merge1: ' + v);
// const source2$ = Rx.Observable.interval(1000).map(v => 'Merge2: ' + v);

// Rx.Observable.merge(source1$, source2$)
//     .take(25)
//     .subscribe(x =>console.log(x));

const source1$ = Rx.Observable.range(0,5).map(v => 'Merge1: ' + v);
const source2$ = Rx.Observable.range(7,5).map(v => 'Merge2: ' + v);

Rx.Observable.concat(source1$, source2$)
    .subscribe(x =>console.log('concat', x));

Rx.Observable.of('Hello')
    .subscribe(
        v => {
            Rx.Observable.of(v+ 'Everyone')
                .subscribe(x=>console.log(x)
                )
        }
    )

Rx.Observable.of('Hello')
    .mergeMap(v => {
        return Rx.Observable.of(v+ 'World');
    })
    .subscribe(x => console.log(x));


/**
 *  scan
 */
const subject = new Rx.Subject();
//scan example building an object over time
const example = subject.scan((acc, curr) => Object.assign({}, acc, curr), {});
//log accumulated values
const subscribe = example.subscribe(val => {
	return writeToSelector('#scan', `${val.name} ${val.age} ${val.favoriteLanguage}`)
});
//next values into subject, adding properties to object
// {name: 'Joe'}
subject.next({ name: 'Joe' });
// {name: 'Joe', age: 30}
subject.next({ age: 30 });
// {name: 'Joe', age: 30, favoriteLanguage: 'JavaScript'}
subject.next({ favoriteLanguage: 'JavaScript' });