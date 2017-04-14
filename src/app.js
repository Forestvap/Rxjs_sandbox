import $ from 'jquery';
import Rx from 'rxjs/Rx';

// const btn = $('#btn');
const input = $('#input');
// const output = $('#output');

// const btnStream$ = Rx.Observable.fromEvent(btn, 'click');

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

// // const inputStream$ = Rx.Observable.fromEvent(input, 'keyup');

// // inputStream$.subscribe(
// //     function(e){
// //         console.log(e.target.value);
// //         output.append(e.target.value);
// //     },
// //     function(){
// //         console.log('completed');
// //     }
// // );

// const moveStream$ = Rx.Observable.fromEvent(document, 'mousemove');

// moveStream$.subscribe(
//     function(e){
//         console.log(e.target.value);
//         output.html('<h1>X: ' + e.clientX + 'Y：' + e.clientY + '</h1>');
//     },
//     function(){
//         console.log('completed');
//     }
    
// );

// const numbers = [33, 44, 55, 66, 77];

// const numbers$ = Rx.Observable.from(numbers);

// numbers$.subscribe(
//     v => {
//     console.log(v);
//     },
//     error => {
//         console.log(error);
//     },
//     complete => {
//         console.log('Completed');
//     }
// );

// const posts = [
//     {title: 'POST ONE', body: 'This is the body'},
//     {title: 'POST TWO', body: 'This is the body'},
//     {title: 'POST THREE', body: 'This is the body'}
// ];

// const postOutput = $('#posts');
// const posts$ = Rx.Observable.from(posts);

// posts$.subscribe(
//     post => {
//         console.log(post);
//         $('#posts').append('<li><h3>' +post.title + '<h3><p>' + post.body +'</p></li>');
//     },
//     error => {
//         console.log(error);
//     },
//     complete => {
//         console.log('Completed');
//     }
// )

// // Set

// const set = new Set(['Hello', 44, {title: 'My Title'}]);

// const set$ = Rx.Observable.from(set);

// set$.subscribe(
//     v => {
//         console.log(v);
//     },
//     err => {
//         console.log(err);
//     },
//     complete => {
//         console.log('Completed');
//     }
// );

// // Map

// const map = new Map([[1,2],[2,3],[3,4]]);

// const map$ = Rx.Observable.from(map);

// map$.subscribe(
//     v => {
//         console.log(v);
//     },
//     err => {
//         console.log(err);
//     },
//     complete => {
//         console.log('Completed');
//     }
// )

// // Source Observer

// const source$ = new Rx.Observable(
//     observer => {
//         console.log('Creating Observable');

//         observer.next('Hello World');
//         observer.next('Another World');

//         observer.error(new Error('Error: something went wrong'));
//         setTimeout(()=>{
//             observer.next('Another wWorld');
//             observer.complete();
//         }, 3000);
        
//     }
// );

// source$
// .catch(err => Rx.Observable.of(err))
// .subscribe(
//     x => {
//         console.log(x);
//     },
//     err => {
//         console.log(err);
//     },
//     complete => {
//         console.log('Completed');
//     }
// );

// // Promise

// const myPromise = new Promise(
//     (resolve, reject) => {
//         console.log('Creating promise');
//         setTimeout(()=>{
//             resolve('Hello From promise');
//         }, 3000);
//     }
// );

// // myPromise.then(
// //     x => {
// //         console.log(x);
// //     } 
// // );

// const promise$ = Rx.Observable.fromPromise(myPromise);

// promise$.subscribe(
//     x => console.log(x)
// );

// function getUser(username){
//     return $.ajax({
//         url: 'https://api.github.com/users/' + username,
//         dataType: 'jsonp'
//     }).promise();
// }

// const inputSource$ = Rx.Observable.fromEvent($('#input'), 'keyup');

// inputSource$.subscribe(
//     e => {
//         console.log(e);
//         Rx.Observable.fromPromise(getUser(e.target.value))
//             .subscribe(
//                 x=>{
//                     $('#name').text(x.data.name);
//                     $('#blog').text(x.data.blog);
//                     $('#repos').text('Public repos: ' + x.data.public_repos);
//                 },
//                 err=>{
//                     console.log(err);
//                 }
//             );
//     },
//     error => {
//         console.log(error);
//     }
// )

// // intervale

// // const count$ = Rx.Observable.interval(100)
// //     .take(6);

// // const count$ = Rx.Observable.timer(5000, 2000)
// //     .take(6);

// const count$ = Rx.Observable.range(25,100);

// count$.subscribe(
//     x => {
//         console.log(x);
//     },
//     err =>{
//         console.log(err);
//     },
//     complete => {
//         console.log('completed')
//     }

// )

//Map
const arr = [
    'John',
    'Tom',
    'Shawn'
]
const map$ = Rx.Observable.interval(1000)
    .take(10)
    .map(v => v*2);
const arr$ = Rx.Observable.from(arr)
    .map(v=> v.toUpperCase())
    .map(v=> 'I am ' + v);

arr$.subscribe(v =>console.log(v));

map$.subscribe(v => console.log(v));

// //Map
// function getUser(username){
//     return $.ajax({
//         url: 'https://api.github.com/users/' + username,
//         dataType: 'jsonp'
//     }).promise();
// }
// Rx.Observable.fromPromise(getUser('forestvap'))
//             .map(user => user.data.name)
//             .subscribe(
//                 name=>{
//                    console.log(name);
//                 },
//                 err=>{
//                     console.log(err);
//                 }
//             );

// const users = [
//     {name: 'Will', age: 34},
//     {name: 'Mike', age: 33},
//     {name: 'Paul', age: 35}
// ];

// const users$ = Rx.Observable.from(users)
//     .pluck('name');

// users$.subscribe(x => console.log(x));

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
    .subscribe(x =>console.log(x));

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

function getUser(username){
    return $.ajax({
        url: 'https://api.github.com/users/' + username,
        dataType: 'jsonp'
    }).promise();
}

const inputSource$ = Rx.Observable.fromEvent(input , 'keyup')
    .map(e => e.target.value)
    .switchMap(v =>{ 
        return Rx.Observable.fromPromise(getUser(v));
    })

inputSource$.subscribe(
    x=>{
                    $('#name').text(x.data.name);
                    $('#blog').text(x.data.blog);
                    $('#repos').text('Public repos: ' + x.data.public_repos);
                },
)