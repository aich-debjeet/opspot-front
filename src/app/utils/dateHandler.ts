export default function dob() {
        let date = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        let month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
        let year = [];
        let a = new Date().getFullYear() ;
        let ab = a - 70;
        for (let i: any = a; i >= ab; i--) {
          year.push(i)
        }
        const val = { date, month, year };
        return val;
      }
